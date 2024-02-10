import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { RtGuard } from './guard';
import { Public,GetCurrentUserId,GetCurrentUser } from './decorator';
import { RecoverDto } from './dto/recover.dto';
import { NewPassDto } from './dto/newPass.dto';
import { CompanyDto } from './dto/company.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}



  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('companysignup')
  companySignup(@Body() dto: CompanyDto) {
    return this.authService.companySignup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('aprobarempresa')
  async aprobarEmpresa(@Body() dto): Promise<string> {
    //\console.log(dto)
   
    const mensajeExito = await this.authService.aprobarEmpresa(dto.id_empresa);
    return mensajeExito;
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    //\console.log(dto)
    return this.authService.signin(dto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('apruebotokenempresa/:token')
  aprueboTokenEmpresa( @Param('token') token: string) {
   
    //\console.log(dto)
    return this.authService.aprueboTokenEmpresa(token);
  }
  

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('recover')
  recover(@Body() dto: RecoverDto) {
    //console.log(dto)
  
    return this.authService.recover(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('newpass')
  newPass(@Body() dto: NewPassDto) {
    //console.log(dto)
  
    return this.authService.newPass(dto);
  }



  //@UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetCurrentUserId() userId:number){

    
    return this.authService.logout(userId); 


  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(
    @GetCurrentUserId() userId:number,
    @GetCurrentUser('refreshToken') refreshToken:string){

    return this.authService.refreshToken(userId,refreshToken); 

  }

  @Public()
  @Post('google/login')
  //@UseGuards(GoogleAuthGuard)
  async googleVerify(@Body('token') token) {
    
    try{
      
      const newToken = await this.authService.googleVerify(token)
      
      return true

    }catch(error){

      return false   
    }

  }





  @Public()
  @Get('login/renew')
  //@UseGuards(GoogleAuthGuard)
  async verificoTokenUsuario(@Body('token') token) {
    try{
      
      const newToken = await this.authService.verificoTokenUsuario(token)
      
      return { 
              ok:true,
              msg: 'Google Authentication',
              newToken  
              };

    }catch(error){

      return { 
             ok:false, 
             msg: 'Error en autenticacion de Google',
             error 
            };    
    }
  }



  //@Public()
  @Get('verify')
  //@UseGuards(GoogleAuthGuard)
  async verifyToken(req, res) {

    console.log(req);
    try{
      
      const newToken = await this.authService.verifyToken(req, res)
      
      return newToken;

    }catch(error){

      return { 
             ok:false, 
             msg: 'Error en autenticacion de Google',
             error 
            };    
    }
  }

  @Get('validoToken')
  async validarToken(@Body('token') token: string) {
    console.log(token)
    //const valido = await this.authService.validarToken(token);
    return true ;
  }

}
