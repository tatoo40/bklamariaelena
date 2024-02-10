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
  import { GeneralEmpresaService } from './generalempresa.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('generalempresa')
  export class GeneralEmpresaController {
    constructor(
      private generalEmpresaService: GeneralEmpresaService,
     
    ) {}
  
    
    @Get(':tabla/:empresa')
    getGeneralByEmpresa(

      @Param('empresa', ParseIntPipe) empresa: number,
      @Param('tabla') tabla:string

    ) {
      return this.generalEmpresaService.getGeneralByEmpresa(
            
        empresa,
            tabla

      );
    }
 


    @Post(':tabla')
    createGeneral( 

      @Param('tabla') tabla:string,
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.generalEmpresaService.createGeneral(
        tabla,
        dto
      );
    }



    
    @Get(':tabla')
    getGeneral(
  
      @Param('tabla') tabla:string,
      @Query('ord') criterioOrd: string
    ) {
      
      //console.log(orden)
      
      return this.generalEmpresaService.getGeneral(
            
        tabla,
        criterioOrd

      );
    }


    @Patch(':tabla/:id')
    editGeneralById(
      @Param('tabla') tabla:string,
      @Param('id', ParseIntPipe) Id: number,
      @Body() dto,
    ) {

      console.log(tabla)
      console.log(dto)
      return this.generalEmpresaService.editGeneralById(
        tabla,
        Id,
        dto,
      );
    }
  
    //@HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':tabla/:id')
    deleteGeneralById(

      @Param('id', ParseIntPipe) id: number,
      @Param('tabla') tabla:string

    ) {
      console.log('algo pasa')
      return this.generalEmpresaService.deleteGeneralById(
            
            id,
            tabla

      );
    }



  }
  