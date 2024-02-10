import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';


  @Injectable()
  export class GeneralPublicService {
    
    constructor(private prisma: PrismaService) {}
    public model:string = '';
    public field:string = '';
    
    getGeneralById(id: number, tabla:string) {
      
      this.model=tabla;
      console.log(this.model)
      return this.prisma[this.model].findFirst({
        where: {
          id,
          estado:'S'
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

    

  }
