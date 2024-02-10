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
  import { GeneralService } from './general.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('general')
  export class GeneralController {
    constructor(
      private generalService: GeneralService,
     
    ) {}
  
    
    @Get(':tabla/:id')
    getGeneralById(

      @Param('id', ParseIntPipe) id: number,
      @Param('tabla') tabla:string

    ) {
      return this.generalService.getGeneralById(
            
            id,
            tabla

      );
    }
 
    @Get(':tabla/:field/:id')
    getGeneralByIdField(

      @Param('id') id,
      @Param('tabla') tabla:string,
      @Param('field') field:string

    ) {
      //console.log('aca')
      return this.generalService.getGeneralByIdField(
            
            id,
            tabla,
            field

      );
    }


    @Post(':tabla')
    createGeneral( 

      @Param('tabla') tabla:string,
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.generalService.createGeneral(
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
      
      return this.generalService.getGeneral(
            
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
      return this.generalService.editGeneralById(
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
      return this.generalService.deleteGeneralById(
            
            id,
            tabla

      );
    }



  }
  