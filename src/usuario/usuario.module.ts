import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { JwtStrategy } from '../auth/strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtStrategy],
})
export class UsuarioModule {}
