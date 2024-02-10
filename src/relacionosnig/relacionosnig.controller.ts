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
  import { RelacionoSnigService } from './relacionosnig.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('relacionosnig')
  export class RelacionoSnigController {
    constructor(
      private RelacionoSnigService:RelacionoSnigService,
     
    ) {}
  
    
    @Get(':empresa/:id')
    getRelacionoSnigById(

      @Param('id', ParseIntPipe) id: number,
      @Param('empresa') empresa:string

    ) {
      return this.RelacionoSnigService.getRelacionoSnigById(
            
            id,
            empresa

      );
    }
 
    @Get(':empresa/:field/:id')
    getRelacionoSnigByIdField(

      @Param('id') id,
      @Param('empresa') empresa:string,
      @Param('field') field:string

    ) {
      return this.RelacionoSnigService.getRelacionoSnigByIdField(
            
            id,
            empresa,
            field

      );
    }


    @Post(':empresa')
    createRelacionoSnig( 

      @Param('empresa') empresa:string,
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.RelacionoSnigService.createRelacionoSnig(
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
      
      return this.RelacionoSnigService.getRelacionoSnig(
            
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
      return this.RelacionoSnigService.editRelacionoSnigById(
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
      return this.RelacionoSnigService.deleteRelacionoSnigById(
            
            id,
            empresa

      );
    }



  }
  