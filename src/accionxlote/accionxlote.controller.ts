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
    UseGuards,
    ValidationPipe,
    
  } from '@nestjs/common';

  import { JwtGuard } from '../auth/guard';
  import { AccionxloteService } from './accionxlote.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  //@UseGuards(JwtGuard)

  @Controller('accionxlote')
  export class AccionxloteController {
    constructor(
      private AccionxloteService: AccionxloteService,
     
    ) {}
  

    @Get(':tabla/:id')
    getGeneralById(

      @Param('id', ParseIntPipe) id: number,
      @Param('tabla') tabla:string

    ) {
      return this.AccionxloteService.getGeneralById(
            
            id,
            tabla

      );
    }




    //@Public()
    @HttpCode(HttpStatus.OK)
    @Post(':accion')
    accionxlote( 
      @Param('accion') accion:string,
      @Body('formData') dto

    ) 
    {

      //console.log('sdasdasddasdsad')
      //console.log(dto)
      
      //console.log(JSON.stringify(dto));


      return this.AccionxloteService.accionxlote(
        accion,
        dto

      ); 
    }
    
    @Get(':tabla')
    getGeneral(
  
      @Param('tabla') tabla:string

    ) {
      return this.AccionxloteService.getGeneral(
            
        tabla

      );
    }

  }
  