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
  import { AccionRegistroService } from './accionRegistro.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('accionregistro')
  export class AccionRegistroController {
    constructor(
      private AccionRegistroService: AccionRegistroService,
     
    ) {}
  
    
    @Get(':accion/:id')
    getGeneralById(

      @Param('id', ParseIntPipe) id: number,
      @Param('accion') accion:string

    ) {
      return this.AccionRegistroService.getAccion(
            
            id,
            accion

      );
    }
 
  

  }
  