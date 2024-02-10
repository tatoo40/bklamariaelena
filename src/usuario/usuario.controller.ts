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
  import { UsuarioService } from './usuario.service';
  import {CreateUsuarioDto} from './dto/create-usuario.dto';
  import {EditUsuarioDto} from './dto/edit-usuario.dto';
  import { AuthService } from '../auth/auth.service';

  //@UseGuards(JwtGuard)
  @Controller('usuarios')
  export class UsuarioController {
    constructor(
      private usuarioService: UsuarioService
    ) {}
  
    @Get()
    getUsuarios(@GetUser('id') userId: number) {
      return this.usuarioService.getUsuarios(
        userId,
      );
    }
  
    @Get(':id')
    getUsuariosById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) usuarioId: number,
    ) {
      return this.usuarioService.getUsuariosById(
        userId
      );
    }
 
    @Get(':email')
    getUsuariosByEmail(email:string) {
      return this.usuarioService.getUsuariosByEmail(
        email
      );
    }    


    @Post()
    createUsuario(
      //@GetUser('id') userId: number,
      @Body() dto: CreateUsuarioDto,
    ) {
    
      return this.usuarioService.createUsuario(
        dto,
      );
    }
  
    @Patch(':id')
    editUsuarioById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) usuarioId: number,
      @Body() dto: EditUsuarioDto,
    ) {
      return this.usuarioService.editUsuarioById(
        userId,
        dto
      );
    }
  
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteUsuarioById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) usuarioId: number,
    ) {
      return this.usuarioService.deleteUsuarioById(
        userId
      );
    }
  }
  