import { Module } from '@nestjs/common';
import { AccionRegistroController } from './accionRegistro.controller';
import { AccionRegistroService } from './accionRegistro.service';

@Module({
  controllers: [AccionRegistroController],
  providers: [AccionRegistroService]
})
export class AccionRegistroModule {}
