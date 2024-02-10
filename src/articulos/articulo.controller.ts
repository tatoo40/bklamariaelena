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
import { ArticuloService } from './articulo.service';
import {
  CreateArticuloDto,
  EditArticuloDto,
} from './dto';

@UseGuards(JwtGuard)

@Controller('articulo')
export class ArticuloController {
  constructor(
    private articuloService: ArticuloService,
  ) {}

  @Get()
  getArticulos() {
    return this.articuloService.getArticulos(

    );
  }

  @Get(':id')
  getArticuloById(

    @Param('id', ParseIntPipe) articuloId: number,
  ) {
    return this.articuloService.getArticuloById(
   
      articuloId,
    );
  }

  @Post()
  createArticulo(
   
    @Body() dto: CreateArticuloDto,
  ) {
    return this.articuloService.createArticulo(
   
      dto,
    );
  }

  @Patch(':id')
  editArticuloById(
  
    @Param('id', ParseIntPipe) articuloId: number,
    @Body() dto: EditArticuloDto,
  ) {
    return this.articuloService.editArticuloById(

      articuloId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArticuloById(
    
    @Param('id', ParseIntPipe) articuloId: number,
  ) {
    return this.articuloService.deleteArticuloById(
     
      articuloId,
    );
  }
}
