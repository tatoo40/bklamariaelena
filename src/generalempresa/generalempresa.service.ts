import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

  @Injectable()
  export class GeneralEmpresaService {
    
    constructor(private prisma: PrismaService) {}
    public model:string = '';
    public field:string = '';
    

    getGeneralByEmpresa(empresa: number, tabla:string) {
      
      this.model=tabla;
      console.log(this.model)
      return this.prisma[this.model].findMany({
        where: {
      
          estado:'S',
          id_empresa:empresa

        },
      });

    }

    
    getGeneralByIdField(id, tabla:string, field:string) {
      
      this.model=tabla;
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
   
          [this.field]:id,          
          estado:'S'
        },
      });

    }
    
    getGeneral(tabla:string,criterioOrd:string) {
      
      this.model=tabla;
      //console.log(criterioOrd);
      if (criterioOrd===undefined){
        criterioOrd = 'asc'
      }
      //console.log(tabla)
      return this.prisma[this.model].findMany({
        where: {      
          estado:'S'
        },
        orderBy: [
          {
            id: criterioOrd,
          }
        ],
      });
      
    }


    async createGeneral(
      tabla:string,
      dto
    ) 
    {
      try {

          this.model=tabla;
     
          delete dto['id']
    
          console.log(dto)
          const general =
            await this.prisma[this.model].create({
              data: {
                ...dto
              },
            });
      
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

    async editGeneralById(
      tabla:string,
      id: number,
      dto,
    ) {
      // get the bookmark by id

      this.model=tabla;

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

    async deleteGeneralById(Id:number,tabla:string) {
      
      this.model=tabla;

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
    

  }
  function withoutProperty(obj, property) {  
    const { [property]: unused, ...rest } = obj

  return rest
}