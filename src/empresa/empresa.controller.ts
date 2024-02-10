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
  } from '@nestjs/common';
  import { GetUser } from '../auth/decorator';
  import { JwtGuard } from '../auth/guard';
  import { EmpresaService } from './empresa.service';
  import {
    CreateEmpresaDto,
    EditEmpresaDto,
  } from './dto';
  
  @UseGuards(JwtGuard)
  @Controller('empresas')
  export class EmpresaController {
    constructor(
      private empresaService: EmpresaService,
    ) {}
  
    @Get()
    getEmpresas() {
      return this.empresaService.getEmpresas(
      );
    }
  
    @Get(':id')
    getEmpresasById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) empresasId: number,
    ) {
      return this.empresaService.getEmpresaById(
        userId,
        empresasId,
      );
    }
  
    @Post()
    createEmpresas(
      @Body() dto: CreateEmpresaDto,
    ) {
      return this.empresaService.createEmpresa(
      
        dto
      );
    }
  
    @Patch(':id')
    editEmpresaById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) empresasId: number,
      @Body() dto: EditEmpresaDto,
    ) {
      return this.empresaService.editEmpresaById(
        empresasId,
        dto,
      );
    }
  
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteEmpresaById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) empresasId: number,
    ) {
      return this.empresaService.deleteEmpresaById(
        userId,
        empresasId,
      );
    }
  }
  