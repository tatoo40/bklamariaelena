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

  @Injectable()
  export class RelacionoSnigService {
    
    constructor(private prisma: PrismaService, private ganado:GanadoService) {}
    public model:string = '';
    public field:string = '';
    
    getRelacionoSnigById(id: number, empresa:string) {
      
      this.model='cpt_relaciono_snig';
      console.log(this.model)
      return this.prisma[this.model].findFirst({
        where: {
          id_empresa:empresa,
          estado:'S'
        },
      });

    }

    getRelacionoSnigByIdField(id, empresa:string, field:string) {
      
      this.model='cpt_relaciono_snig';
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
      
      this.model='cpt_relaciono_snig';
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


    async createRelacionoSnig(
      empresa:string,
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
    
          //console.log(dto)
          dtoLineas=dto.lineas;

          const general =
            await this.prisma.cpt_relaciono_snig.create({
              data: {
                nro_trans:nro_trans,
                observaciones:dto.observaciones,
                fecha:formattedDate,
                id_empresa:dto.id_empresa,
                cantidad_ganado:dtoLineas.length
              },
            });
      

            idRegistro =general.id

            
       
            //console.log(dtoLineas)
            for (var i = 0; i < dtoLineas.length; ++i) {

                  // comienzo a recorrer el array de objetos
                  // compongo el dispositivo en caravana
                  // Verfico si esta o no en el stock
                  // Si no lo esta le doy de alta en la cpf_Stockaux, cpt_identidad
                  // En case de no estarlo grabo en una estrctura de no procesadas

                  huboCambioLineas=true;


                  // Combine the prefix and the original number
        

                  // Combine the prefix and the original number
                  let combinedNumberCnt = prefix + dtoLineas[i].Dispositivo.toString();
        
                  const zerosNeeded = desiredLength - combinedNumberCnt.length;
                  
                  // Pad the original number with leading zeros
                  const paddedNumber = prefix + '0'.repeat(zerosNeeded) +  dtoLineas[i].Dispositivo.toString();
                  
                  //console.log(`Result: ${paddedNumber}`);


                  //console.log(dtoLineas[i]);
          
                  const existeCaravana = await this.ganado.getExisteCaravana(paddedNumber);


                  console.log(existeCaravana)


                  if (!existeCaravana){
                    console.log(existeCaravana)
                    // si no existe la creo
                    // const articuloGanado: string = await getArticuloGanado(); 
                    const articuloGanado = await this.ganado.obtengoArticuloGanado(dtoLineas[i].Raza, dtoLineas[i].Sexo, dtoLineas[i].EdadDias)



                    //console.log(articuloGanado);
                    //console.log('sdasdasd')
                    await this.prisma.cpf_stockaux.create({
                       data: {
                         nro_trans: nro_trans,
                         cantidad: 1,
                         cantidad2: 0,
                         cantidad3: 0,
                         signo: 1,
                         nro_lote:'relacionSnig',
                         cod_identidad:paddedNumber,                    
                         fecha:formattedDate,
                         id_motivo_stk:1,
                         cod_articulo:articuloGanado['cod_articulo'],
                         id_unidad_stk:1,
                         id_empresa:dto.id_empresa,
                         id_estado_stock:1, 
                         id_sector:7
           
           
                       }});
               
                     //let fecha_registro_formateada = dtoLineas[i].Fecha_registro.replace(/\r/g, '');
                     //console.log()
                     //console.log(fecha_registro_formateada)

                     await this.prisma.cpt_identidad.create({
                       data: {
         
                         nro_lote:'relacionSnig',
                         cod_identidad:paddedNumber,                     
                         cod_articulo:articuloGanado['cod_articulo'],      
                         dias:parseInt(dtoLineas[i].EdadDias),
                         meses:parseInt(dtoLineas[i].EdadMeses),
                         propietario:dtoLineas[i].Propietario,
                         ubicacion:dtoLineas[i].Ubicacion,
                         tenedor:dtoLineas[i].Tenedor,
                         status_vida:dtoLineas[i].Status_de_vida,
                         status_trazabilidad:dtoLineas[i].Status_de_vida,
                         errores:dtoLineas[i].Errores,
                         sexo:dtoLineas[i].Sexo,
                         cruza:dtoLineas[i].Cruza,
                         id_empresa:dto.id_empresa,
                         fecha_ingreso:moment(dtoLineas[i].Fecha_ingreso_a_ubicacion_actual).format(format),
                         documento_ingreso:dtoLineas[i].Documento_de_ingreso_a_ubicacion_actual,
                         fecha_identificacion:moment(dtoLineas[i].Fecha_identificacion).format(format),    
                         peso_inicial:0,                     
                         fecha_entrada:moment(dtoLineas[i].Fecha_ingreso_a_ubicacion_actual).format(format), 
                         id_categoria_ganado:articuloGanado['id_categoria_ganado'],
                         id_marca_ganado:articuloGanado['id_marca_ganado']     

           
                       }}); 

                  }else{
                   

         
                    
                    caravanasNoprocesadas.push({
                      
                      cod_articulo: existeCaravana.cod_articulo,
                      paddedNumber: paddedNumber

                    });



                  }


                  console.log(caravanasNoprocesadas)





            }

         
  

                //cpf_log
                cpf_log =        
                await this.prisma.cpf_log.create({
                data: {
                  nro_trans: nro_trans,
                  id_registro: idRegistro,
                  id_accion:1,
                  id_seccion:55,
                  fecha:formattedDate,
                  descripcion:'Recoleccion de datos del snig',
                  cod_docum:'recolSnig',
                  observacion:  'Recoleccion de datos del snig',
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

      this.model='cpt_relaciono_snig';

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
      
      this.model='cpt_relaciono_snig';

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