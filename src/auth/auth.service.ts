import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto,NuevoPermiso } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDetails } from '../auth/utils/types'
import { OAuth2Client } from 'google-auth-library';
import { RecoverDto } from './dto/recover.dto';
import { NewPassDto } from './dto/newPass.dto';
import { CompanyDto }  from './dto/company.dto'
import moment = require("moment");
import * as fs from 'fs';
import { MailerService } from '@nestjs-modules/mailer';


export type SendEmailDto = {

  sender?: string;
  recipients: string;
  subject:string;
  text:string;
  html:string;

}

@Injectable()

export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailerService: MailerService
    //private envioCorreo: 

  ) {}
  
  hashData(data:string){
    return argon.hash(data)
  }





    // oauth2Client.getAccessToken((err, token) => {
    //     if (err)
    //         return console.log(err);;
    //     accountTransport.auth.accessToken = token;
    //     callback(nodemailer.createTransport(accountTransport));
    // });


async sendEmail(dto:SendEmailDto){
  const { sender, recipients, subject, text,html } = dto;

  // const sender: string | Address = dto.sender ?? {
  //   name:this.config.get<string>('APPNAME'),
  //   address:this.config.get<string>('EMAIL_SENDER')
  // }



  try{
    const result = await this.mailerService.sendMail({

      from:sender,
      to:recipients,
      subject,
      text,
      html
  
    });
    console.log(result)
    return result;

  }catch(error){

    console.log('error:',error)


  }

}
  
async companySignup(dto: CompanyDto) {



  // generate the password hash
  //const hash = await argon.hash(dto.hash);
  // save the new user in the db
  const payload = {
    sub: dto.email_contacto
  };
  const secret = this.config.get('JWT_SECRET');



  const token = await  this.jwt.signAsync(
    payload,
    {
      expiresIn: '60m',
      secret: secret,
    },
  );


  try {
  
     const usuario = await this.prisma.empresa.create({
      data: {
        
        email_contacto: dto.email_contacto,
        nombre: dto.nombre,
        rut: dto.rut,
        razon_social: dto.razon_social,
        direccion: dto.direccion,
        activa:false,
        aprobada:false,
        token:token,
        telefono_contacto:dto.telefono_contacto,
        observaciones:''


      }
    });
 

    const dtoEmailAdmin: SendEmailDto = {
      sender: '"No reply"<no-reply@ganao.app>',
      recipients:  'jfernandezberrutti@gmail.com',
      subject: 'Nueva Solicitud de Registro de Empresa',
      text: `Hola,\n\nSe ha recibido una nueva solicitud de registro de la empresa "${dto.nombre}".\n\nSaludos,`,
      html: `<h3>Hola,</h3><p>Se ha recibido una nueva solicitud de registro de la empresa "${dto.nombre}".</p><p>Saludos,</p>`
    };

    this.sendEmail(dtoEmailAdmin);
    

    const htmlContent = fs.readFileSync('/Users/tato/Desktop/ganao/backend/backendlamariaelena/src/htmlcorreos/registroempresausuario.html', 'utf8');

    const dtoEmailUsu: SendEmailDto = {
      sender: '"No reply"<no-reply@ganao.app>',
      recipients:  dto.email_contacto,
      subject: 'Nueva Solicitud de Registro de Empresa',
      text: `Hola,\n\nSe ha recibido una nueva solicitud de registro de la empresa "${dto.nombre}".\n\nSaludos,`,
      html: htmlContent
    };

    this.sendEmail(dtoEmailUsu); 

    //Genero los pemrisos para el rol definido
    const format = 'YYYY-MM-DDT00:00:00.000Z';
    const myDate = new Date();
    const formattedDate = moment(myDate, 'DD/MM/YYYY').format(format);

    const tokens = await this.getTokens(usuario.id, usuario.email_contacto);
      
    //await this.updateRtHash(usuario.id,tokens.refresh_Token)
    
    return this.signToken(usuario.id, usuario.email_contacto);
    
    //return 'Empresa ha sido preinscripta con exito. Verificaremos y le enviaremos un correo con los pasos a seguir';
    
  } catch (error) {
    
     if (
      error instanceof
      PrismaClientKnownRequestError
    ) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
           'Ha ocurrido un error'
       

        );
      }
    }
    throw error; 
  }
}


async aprueboTokenEmpresa(token){

  console.log(token)
  const empresa = await this.prisma.empresa.findFirst({
    where: { token: token },
  });


  console.log(empresa)
  if (!empresa) {
    throw new NotFoundException(`Token invalido`);
  }
    // Verificar si la empresa ya ha sido aprobada antes
    if (empresa.aprobada) {
        // Actualizar el campo 'aprobada' a true
        // await this.prisma.empresa.update({
        //   where: { id: empresa.id },
        //   data: { token: '',activa:true },
        // });

        return empresa.id
    }



}
  


async aprobarEmpresa(idEmpresa: number): Promise<string> {
  // Buscar la empresa en la base de datos
  const empresa = await this.prisma.empresa.findUnique({
    where: { id: idEmpresa },
  });

  // Verificar si la empresa existe
  if (!empresa) {
    throw new NotFoundException(`Empresa con ID ${idEmpresa} no encontrada`);
  }
    // Verificar si la empresa ya ha sido aprobada antes
    if (empresa.aprobada) {
      throw new ConflictException(`La empresa con ID ${idEmpresa} ya ha sido aprobada previamente`);
    }
  // Actualizar el campo 'aprobada' a true
  await this.prisma.empresa.update({
    where: { id: idEmpresa },
    data: { aprobada: true },
  });

  const payload = {
    sub: empresa.email_contacto
  };
  const secret = this.config.get('JWT_SECRET');



  const token = await  this.jwt.signAsync(
    payload,
    {
      expiresIn: '60m',
      secret: secret,
    },
  );
//const token = uuidv4(); // Reemplaza esto con tu lógica para generar un token único

    // Enviar correo electrónico al correo de contacto de la empresa con el enlace de activación
    await this.enviarCorreoActivacion(empresa.email_contacto, empresa.token);



    return 'Empresa aprobada con éxito';
}

async enviarCorreoActivacion(correoContacto: string, token: string): Promise<void> {
  // Construir el enlace de activación
  const enlaceActivacion = `https://ganao.app/authentication/signup?token=${token}`;




  const mensajeCorreo: SendEmailDto = {
    sender: '"No reply"<no-reply@ganao.app>',
    recipients: 'jfernandezberrutti@gmail.com,cocina.anton@gmail.com',
    subject: 'Activación de cuenta de empresa aprobada',
    html: `<p>Hola,</p><p>Tu empresa ha sido aprobada. Haz clic en el siguiente enlace para registrar tu usuario:</p><p><a href="${enlaceActivacion}">${enlaceActivacion}</a></p>`,
    text: ''
  };

  await this.sendEmail(mensajeCorreo);
  
}








  async signup(dto: AuthDto) {


    
    // generate the password hash
    console.log(dto)
    const hash = await argon.hash(dto.hash);
    // save the new user in the db
    try {
    
      const usuario = await this.prisma.usuario.create({
        data: {
          
          email: dto.email,
          nombre: dto.nombre,
          apellido: dto.apellido,
          hash,
          hashRt:'',
          isRegisteredWithGoogle:false,
          id_rol:dto.id_rol
  
        }
      });

      //vinculo el usuario con la empresa
      const usuario_x_empresa = await this.prisma.usuarios_x_empresas.create({
        data:{
          id_usuario:usuario.id,
          id_empresa:dto.id_empresa

        }

      })


      //Genero los pemrisos para el rol definido
      const format = 'YYYY-MM-DDT00:00:00.000Z';
      const myDate = new Date();
      const formattedDate = moment(myDate, 'DD/MM/YYYY').format(format);

     // console.log(formattedDate);




    //
      const permisos:any = await this.prisma.$queryRaw<NuevoPermiso[]>`SELECT  nextval('permisos_x_usuario_seccion_id_seq'::regclass) id,
      ${formattedDate} createdAt,${formattedDate} updatedAt,'S' estado,
      ${usuario.id} id_usuario,permisos_x_rol_seccion.id_seccion, permisos_x_rol_seccion.id_accion ,${usuario.id} id_mod
      FROM permisos_x_rol_seccion
      WHERE permisos_x_rol_seccion.id_rol=${usuario.id_rol}`;     

      //console.log(permisos);
      //BLOQUE DE TRANSFORMACION DEL JSON DEVUELTO POR PRISMA
      //CONVIERTO LOS STRING EN INT
      [].forEach.call(permisos, function(inst, i){
        // Iterate through all the keys
          [].forEach.call(Object.keys(inst), function(y){
              // Check if string is Numerical string
               if(!isNaN(permisos[i][y]))
                  //Convert to numerical value
                  permisos[i][y] = +permisos[i][y];
          });
          
      });
      var nuevoArray=[];

      //LOS CAMPOS QUE DEJO EN MINUSCUAS LOS PONGO COMO TIENEN QUE SER EN OTRO ARRAY
      for(var i in permisos) {    

          var item = permisos[i];   

          nuevoArray.push({ 
              "createdAt" : item.createdat,
              "estado"  : item.estado,
              "id"       : item.id,
              "id_accion" : item.id_accion,
              "id_mod"  : item.id_mod,
              "id_seccion"       : item.id_seccion,
              "id_usuario"  : item.id_usuario,
              "updatedAt"       : item.updatedat,              
          });
      }

      //console.log(nuevoArray);
      //const permisosInserto:any = JSON.parse(permisos);

      const createMany = await this.prisma.permisos_x_usuario_seccion.createMany({
        data: nuevoArray,
        skipDuplicates: true, // Skip 'Bobo'
   
      })

      //console.log(createMany);



      const tokens = await this.getTokens(usuario.id, usuario.email);
      
      await this.updateRtHash(usuario.id,tokens.refresh_Token)
      
      return this.signToken(usuario.id, usuario.email);
      
    } catch (error) {
      
       if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
             'Ha ocurrido un error'
         

          );
        }
      }
      throw error; 
    }
  }

 
  async updateRtHash(userId:number, rt:string){
 

    const hash = await this.hashData(rt)

    await this.prisma.usuario.update({
      where:{
        id:userId
      },
      data:{
        hashRt:hash
      }
    })


  }


  async signin(dto: AuthDto) {
    // find the user by email

    //console.log('aca');
    const usuario =
      await this.prisma.usuario.findUnique({
        where: {
          email: dto.email,
        },
      });

    //console.log(usuario);  
    // if user does not exist throw exception
    if (!usuario)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      usuario.hash,
      dto.hash,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    
       

    const tokens = await this.getTokens(usuario.id, usuario.email);
      
    await this.updateRtHash(usuario.id,tokens.refresh_Token)


    const tokenRetorno = await this.signToken(usuario.id, usuario.email);


  

    const varRetorno:any = {

      token:tokenRetorno,
      datos:usuario
    
    }

    return varRetorno;


  }

  async newPass(dto: NewPassDto) {


    const usuario =
      await this.prisma.usuario.findFirst({
        where: {
          token_recuperacion_pass: dto.token,
          
        },
      });

  
    if (!usuario)
      throw new ForbiddenException(
        'Credentials incorrect',
      );


    const hash = await argon.hash(dto.hash); 

    return this.prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        hash:hash,
        token_recuperacion_pass:''
      },
    });  

    //enviar correo con las intrucciones al usuario
    //envioCorreoUsuario()



    
    //const tokens = await this.getTokens(usuario.id, usuario.email);
      
    //await this.updateRtHash(usuario.id,tokens.refresh_Token)

    return usuario;



  }
  
  async recover(dto: RecoverDto) {
    // find the user by email


    //console.log('sadsdasdas')

    const usuario =
      await this.prisma.usuario.findUnique({
        where: {
          email: dto.email,
        },
      });

    //console.log(usuario);  
    // if user does not exist throw exception
    if (!usuario)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    const hash = await argon.hash(dto.email);  

    return this.prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: { 
        token_recuperacion_pass:hash
      },
    });  
    //enviar correo con las intrucciones al usuario
    //envioCorreoUsuario()

    
    //const tokens = await this.getTokens(usuario.id, usuario.email);
      
    //await this.updateRtHash(usuario.id,tokens.refresh_Token)

    return usuario;



  }




  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await  this.jwt.signAsync(
      payload,
      {
        expiresIn: '60m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }

  async getTokens(
    userId: number,
    email: string, ){

      
    const[at,rt] = await Promise.all(
      [
        this.jwt.signAsync(
          {
          sub: userId,
          email,
        },
        {
          secret:this.config.get('JWT_SECRET'),
          expiresIn:'15m'
        }
        ),
        this.jwt.signAsync(
          {
          sub: userId,
          email,
        },
        {
          secret:this.config.get('RT_SECRET'),
          expiresIn:'15m'
        }
        )

      ],

    )
 

    return {
      access_token: at,
      refresh_Token:rt
    };
  }



  async logout(userId:number){
    await this.prisma.usuario.updateMany({
      where:{
        id:userId,
        hashRt:{
          not:null,
        }
      },
      data:{
        hashRt:null
      }
    })
  }
  async refreshToken(userId:number, rt:string){

      const user = await this.prisma.usuario.findUnique({
        where:{
          id:userId
        }
      })

      if(!user || !user.hashRt) throw new ForbiddenException('Access denied')

      const pwMatches = await argon.verify(
        rt,
        user.hashRt,
      );
      // if password incorrect throw exception
      if (!pwMatches)
        throw new ForbiddenException(
          'Access denied',
      );
      const tokens = await this.getTokens(user.id, user.email);
      
      await this.updateRtHash(user.id,tokens.refresh_Token);

      return tokens;

  }


  googleLogin(req){
    if(!req.user){
      return 'No user from google'
    }
    return{
      message: 'User Info from google',
      user:req.user
    }
  }

  async googleVerify(token){

    const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_SECRET)
    const ticket = await client.verifyIdToken({
      idToken:token,
      audience:process.env.GOOGLE_AUTH_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];
 

    const usuarioDb = await this.prisma.usuario.findUnique({
      where:{
        email:payload.email
      }

    })
    if (!usuarioDb){

        const usuario = await this.prisma.usuario.create({
          data: {
            
            email: payload.email,
            nombre: payload.given_name,
            apellido: payload.family_name,
            hash:'@@@',
            hashRt:'',
            isRegisteredWithGoogle:true,
            id_rol:1
    
          },
        });

        const tokens = await this.getTokens(usuario.id, usuario.email);
        
        await this.updateRtHash(usuario.id,tokens.refresh_Token)
        
        return this.signToken(usuario.id, usuario.email);            

    }else{

        await this.prisma.usuario.updateMany({
          where:{
            id:usuarioDb.id
          },
          data:{
            isRegisteredWithGoogle:true
          }
        })

        return this.signToken(usuarioDb.id, usuarioDb.email); 

    }

      

  }


  async validateUser(details:UserDetails)
    {
      //console.log('AuthService');
      //console.log(details);

      const user = await this.prisma.usuario.findUnique({
        where:{
          email:details.email
        } 
      })

      if(user) return user;

  }

  async findUser(id: number) {
    const user = await this.prisma.usuario.findFirst({ 
      where:{
        id:id
      }  
    });
    return user;
  }







  async verifyToken(req,res){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');
  
    const token = req.headers.authorization.substr(7);

    if(token!==''){
      
      const content = this.jwt.verify(token);
      req.data = content;

    }else{
      
      res.status(401).json('Token vacio');
    
    }
  
  }


  async validoToken(req, res) {
    if (!req.headers.authorization) {
      return res.status(401).json('No autorizado');
    }
  
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (token) {
      try {
        const content = this.jwt.verify(token);
        req.data = content;
      } catch (error) {
        return res.status(401).json('Token inválido');
      }
    } else {
      return res.status(401).json('Token vacío');
    }
  }
    async validarToken(token: string): Promise<boolean> {
      try {
        // Verificar el token utilizando el servicio JwtService
        const decodedToken = this.jwt.verify(token);
        // Realizar cualquier validación adicional necesaria
        // ...
        return true;
      } catch (error) {
        return false;
      }
    }




  



async verificoTokenUsuario(token){

  const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_SECRET)
  const ticket = await client.verifyIdToken({
    idToken:token,
    audience:process.env.GOOGLE_AUTH_CLIENT_ID
  });

  const payload = ticket.getPayload();
  const userid = payload['sub'];


  const usuarioDb = await this.prisma.usuario.findUnique({
    where:{
      email:payload.email
    }

  })
  if (!usuarioDb){

      const usuario = await this.prisma.usuario.create({
        data: {
          
          email: payload.email,
          nombre: payload.given_name,
          apellido: payload.family_name,
          hash:'@@@',
          hashRt:'',
          isRegisteredWithGoogle:true,
          id_rol:1
  
        },
      });

      const tokens = await this.getTokens(usuario.id, usuario.email);
      
      await this.updateRtHash(usuario.id,tokens.refresh_Token)
      
      return this.signToken(usuario.id, usuario.email);            

  }else{

      await this.prisma.usuario.updateMany({
        where:{
          id:usuarioDb.id
        },
        data:{
          isRegisteredWithGoogle:true
        }
      })

      return this.signToken(usuarioDb.id, usuarioDb.email); 

  }

    

}



}




