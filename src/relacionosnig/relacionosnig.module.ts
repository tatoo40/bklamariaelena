import { Module } from '@nestjs/common';
import { RelacionoSnigController } from './relacionosnig.controller';
import { RelacionoSnigService } from './relacionosnig.service';
import { GanadoService } from 'src/ganado/ganado.service';

@Module({
  controllers: [RelacionoSnigController],
  providers: [RelacionoSnigService, GanadoService]
})
export class RelacionoSnigModule {}
