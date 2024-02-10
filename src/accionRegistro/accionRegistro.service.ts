import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

  @Injectable()
  export class AccionRegistroService {
    status_proc: any;
    message_proc: any;
    
    constructor(private prisma: PrismaService) {}
    public model:string = '';
    public field:string = '';
    
    async getAccion(id: number,accion:string) {
      


      //Obtengo dato de la cpf_log
      // Luego de evaluar el objeto veo la accion a tomar en funcion del tipo de objeto
      const message_proc=''
      const status_proc=''
      const message=''
      const status=''
      const objetoAEvaluar =  await this.prisma.cpf_log.findFirst({
        where: {
          id:id
        },
      });

      
      switch (objetoAEvaluar.cod_docum) {
        case 'altaCmpMasivaConBano':
        case 'altaStockNacGnd':
        case 'ajusteAltaStockGnd':
            switch(accion){
              case 'eliminarTrans':
                console.log(objetoAEvaluar.nro_trans);
                //comienzo el borrado de todas las estructuras corresponientes
                await this.prisma.$queryRaw`DELETE FROM cpt_movimiento_stock WHERE nro_trans=${objetoAEvaluar.nro_trans}`
                await this.prisma.$queryRaw`DELETE FROM cpp_movimiento_stock WHERE nro_trans=${objetoAEvaluar.nro_trans}`
                await this.prisma.$queryRaw`DELETE FROM cpf_stockaux WHERE nro_trans=${objetoAEvaluar.nro_trans}`
                await this.prisma.$queryRaw`DELETE FROM cpp_registro_sanitario WHERE nro_trans=${objetoAEvaluar.nro_trans}`
                await this.prisma.$queryRaw`DELETE FROM cpt_registro_sanitario WHERE nro_trans=${objetoAEvaluar.nro_trans}`
                await this.prisma.$queryRaw`DELETE FROM cpf_log WHERE id=${objetoAEvaluar.id}`

                  this.status_proc='succes';
                  this.message_proc='El proceso se ha realizado con exito. Se ha eliminado todos los registros en las diferentes estrcturas con el nro_trans: '+objetoAEvaluar.nro_trans;
            
              break;
            }


        break;
      }


            return {
              status:this.status_proc,
              message:this.message_proc
            };

    }

    

  }
  function withoutProperty(obj, property) {  
    const { [property]: unused, ...rest } = obj

  return rest
}