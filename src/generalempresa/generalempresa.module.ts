import { Module } from '@nestjs/common';
import { GeneralEmpresaController } from './generalempresa.controller';
import { GeneralEmpresaService } from './generalempresa.service';

@Module({
  controllers: [GeneralEmpresaController],
  providers: [GeneralEmpresaService]
})
export class GeneralEmpresaModule {}
