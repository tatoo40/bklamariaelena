import { Module } from '@nestjs/common';
import { AccionxIndController } from './accionxind.controller';
import { AccionxIndService } from './accionxind.service';
import { GanadoService } from 'src/ganado/ganado.service';
import { UtilesService } from 'src/utiles/utiles.service';

@Module({
  controllers: [AccionxIndController],
  providers: [AccionxIndService, GanadoService, UtilesService]
})
export class AccionxIndModule {}
