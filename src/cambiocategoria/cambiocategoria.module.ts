import { Module } from '@nestjs/common';
import { CambiarCategoriaController } from './cambiocategoria.controller';
import { CambiarCategoriaService } from './cambiocategoria.service';
import { GanadoService } from 'src/ganado/ganado.service';
import { UtilesService } from 'src/utiles/utiles.service';

@Module({
  controllers: [CambiarCategoriaController],
  providers: [CambiarCategoriaService, GanadoService, UtilesService]
})
export class CambiarCategoriaModule {}
