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
  import { CambiarCategoriaService } from './cambiocategoria.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('cambiocategoria')
  export class CambiarCategoriaController {
    constructor(
      private CambioCategoriaService:CambiarCategoriaService,
     
    ) {}
  

 


    @Post(':empresa')
    cambioCategoria( 

      @Param('empresa') empresa:number,
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.CambioCategoriaService.cambioCategoria(
        empresa,
        dto
      );
    }



    
    @Get(':empresa')
    getRelacionoSnig(
  
      @Param('empresa') empresa:string,
      @Query('ord') criterioOrd: string
    ) {
      
      //console.log(orden)
      
      return this.CambioCategoriaService.getRelacionoSnig(
            
        empresa,
        criterioOrd

      );
    }


    @Patch(':empresa/:id')
    editRelacionoSnigById(
      @Param('empresa') empresa:string,
      @Param('id', ParseIntPipe) Id: number,
      @Body() dto,
    ) {

      console.log(empresa)
      console.log(dto)
      return this.CambioCategoriaService.editRelacionoSnigById(
        empresa,
        Id,
        dto,
      );
    }
  
    //@HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':empresa/:id')
    deleteRelacionoSnigById(

      @Param('id', ParseIntPipe) id: number,
      @Param('empresa') empresa:string

    ) {
      console.log('algo pasa')
      return this.CambioCategoriaService.deleteRelacionoSnigById(
            
            id,
            empresa

      );
    }



  }
  