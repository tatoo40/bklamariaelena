import { Module } from '@nestjs/common';
import { AccionxloteController } from './accionxlote.controller';
import { AccionxloteService } from './accionxlote.service';
import { GanadoService } from 'src/ganado/ganado.service';

@Module({
  controllers: [AccionxloteController],
  providers: [AccionxloteService, GanadoService]
})
export class AccionxloteModule {}
