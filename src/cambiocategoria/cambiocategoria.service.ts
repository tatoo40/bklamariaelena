import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';
import * as moment from 'moment';
import { GanadoService } from 'src/ganado/ganado.service';
import { UtilesService } from 'src/utiles/utiles.service';

  @Injectable()
  export class CambiarCategoriaService {
    
    constructor(private prisma: PrismaService, private ganado:GanadoService, private utilesGanado:UtilesService) {}
    public model:string = '';
    public field:string = '';
    
    getRelacionoSnigById(id: number, empresa:string) {
      
      this.model='cpt_recaravaneo';
      console.log(this.model)
      return this.prisma[this.model].findFirst({
        where: {
          id_empresa:empresa,
          estado:'S'
        },
      });

    }

    getRelacionoSnigByIdField(id, empresa:string, field:string) {
      
      this.model='cpt_recaravaneo';
      this.field = field;
      
      var idEvaluo = String(id)
      var countGuiones = idEvaluo.split('-').length - 1;

      //console.log(idEvaluo);
      if (idEvaluo.length === 10 && countGuiones===2){
        //Infiero que es una fecha
         id = new Date(id)

      }else{
        id = parseInt(id);
      }
      
      //console.log(tabla);
      //console.log(id);
      //console.log(field);

      return this.prisma[this.model].findFirst({
        where: {    
   
          id_empresa:empresa,          
          estado:'S'
        },
      });

    }
    
    getRelacionoSnig(empresa:string,criterioOrd:string) {
      
      this.model='cpt_recaravaneo';
      //console.log(criterioOrd);
      if (criterioOrd===undefined){
        criterioOrd = 'asc'
      }
      //console.log(tabla)
      return this.prisma[this.model].findMany({
        where: {      
          estado:'S',
          id_empresa:parseInt(empresa),
        },
        orderBy: [
          {
            id: criterioOrd,
          }
        ],
      });
      
    }


    async cambioCategoria(
      empresa:number,
      dto
    ) 
    
    {
      let cabezal: any;
      let idRegistro:any;
      let dtoLineas:any;
      let lineas:any;
      let cpf_log:any
      let huboCambioLineas:boolean = false;
      let prefix = '858';
      let desiredLength = 15;
      const caravanasNoprocesadas = [];

      try {

        //console.log(dto)
        const nro_trans = await this.obtengoNroTrans();
                          
                          
        const format = 'YYYY-MM-DDT00:00:00.000Z';
        const myDate = dto.fecha;
        //console.log(myDate)
      
        const formattedDate = moment(myDate).format(format);

     
          delete dto['id']

          const articuloGanado:any = await this.ganado.getGanadoByIdSec(dto.cod_identidad);
    
          //console.log(articuloGanado)
          dtoLineas=dto.lineas;


          const general =
            await this.prisma.cpt_recaravaneo.create({
              data: {

                observaciones:dto.observaciones,
                cod_articulo:articuloGanado[0].cod_articulo,
                nro_lote:'0',
                cod_identidad:articuloGanado[0].cod_identidad,
                cod_identidad_nuevo:articuloGanado[0].cod_identidad,
                fecha:formattedDate,
                id_empresa:dto.id_empresa,
                id_categoria_ganado:articuloGanado[0].id_categoria_ganado,
                id_marca_ganado:articuloGanado[0].id_marca_ganado,
                id_sexo:0
     
              },
            });
      

            idRegistro =general.id

            
            const resultadoModifco = this.utilesGanado.modificoArticulo(nro_trans, articuloGanado[0].cod_identidad,dto);
           

            //onsole.log(resultadoModifco);
  

                //cpf_log
                cpf_log =        
                await this.prisma.cpf_log.create({
                data: {
                  nro_trans: nro_trans,
                  id_registro: idRegistro,
                  id_accion:1,
                  id_seccion:55,
                  fecha:formattedDate,
                  descripcion:'Cambio de articulo',
                  cod_docum:'cambArt',
                  observacion:  'Cambio de articulo',
                  id_empresa:dto.id_empresa


                }}); 



          return general;

        } catch (error) {

          if (

            error instanceof
            PrismaClientKnownRequestError

          ) {
  
            console.log(error.code)
            if (error.code === 'P2002') {
              throw new ForbiddenException(
                'Credentials taken',
              );
            }
          }
          throw error;
        }          
    }

    async editRelacionoSnigById(
      empresa:string,
      id: number,
      dto,
    ) {
      // get the bookmark by id

      this.model='cpt_recaravaneo';

      const objeto =
        await this.prisma[this.model].findUnique({
          where: {
            id: id,
          },
        });
  
      // check if user owns the bookmark
      if (!objeto )
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      return this.prisma[this.model].update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      });
    }

    async deleteRelacionoSnigById(Id:number,tabla:string) {
      
      this.model='cpt_recaravaneo';

      {
   
      const objeto =
        await this.prisma[this.model].findFirst({
          where: {
            id: Id,
            estado:'S'
          },
        });
  
      // check if user owns the bookmark
      if (!objeto )
        throw new ForbiddenException(
          'Access to resources denied',
        );
        console.log(this.model)
        //console.log(tabla);
        //console.log(Id);
      console.log(objeto)

      await this.prisma[this.model].update({
        where: {
          id: Id,
        },
        data: {
          estado: 'N'
        },
      });
    }



  }
  async obtengoNroTrans() {
    const numerador = await this.prisma.numerador.findFirst({
      where: {
        descripcion:'nro_trans',
        estado:'S'
      },
    });
  
  
    const updateNumerador = await this.prisma.numerador.update({
      where: {
        id: numerador.id,
      },
      data: {
        valor:numerador.valor + 1,
      },
    });
  
  
   
  
    return numerador.valor + 1;
  
  
  }

  }
  function withoutProperty(obj, property) {  
    const { [property]: unused, ...rest } = obj

  return rest
}