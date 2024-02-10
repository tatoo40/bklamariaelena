import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    
  } from '@nestjs/common';

  import { JwtGuard } from '../auth/guard';
  import { GeneralPublicService } from './generalPublic.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  

  
  @Controller('generalPublic')
  export class GeneralPublicController {
    constructor(
      private generalPublicService: GeneralPublicService,
     
    ) {}
  
    @Public()
    @Get(':tabla/:id')
    getGeneralById(

      @Param('id', ParseIntPipe) id: number,
      @Param('tabla') tabla:string

    ) {
      return this.generalPublicService.getGeneralById(
            
            id,
            tabla

      );
    }
    @Public()
    @Get(':tabla/:field/:id')
    getGeneralByIdField(

      @Param('id') id,
      @Param('tabla') tabla:string,
      @Param('field') field:string

    ) {
      return this.generalPublicService.getGeneralByIdField(
            
            id,
            tabla,
            field

      );
    }

    @Public()
    @Get(':tabla')
    getGeneral(
  
      @Param('tabla') tabla:string,
      @Query('ord') criterioOrd: string
    ) {
      
      //console.log(orden)
      
      return this.generalPublicService.getGeneral(
            
        tabla,
        criterioOrd

      );
    }




  }
  