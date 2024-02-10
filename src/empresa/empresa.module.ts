import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';

@Module({
  providers: [EmpresaService],
  controllers: [EmpresaController]
})
export class EmpresaModule {}


