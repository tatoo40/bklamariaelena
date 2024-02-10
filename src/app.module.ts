import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresaModule } from './empresa/empresa.module';
import { GeneralModule } from './general/general.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guard';
import { PassportModule } from '@nestjs/passport';
import { AccionxloteModule } from './accionxlote/accionxlote.module';
import { GanadooModule } from './ganado/ganado.module';
import { GeneralPublicModule } from './generalPublic/generalPublic.module';
import { AccionRegistroModule } from './accionRegistro/accionRegistro.module';
import { UtilesModule } from './utiles/utiles.module';
import { ReportesModule } from './reportes/reportes.module';
import { RelacionoSnigModule } from './relacionosnig/relacionosnig.module';
import { CambiarCategoriaModule } from './cambiocategoria/cambiocategoria.module';
import { GeneralEmpresaModule } from './generalempresa/generalempresa.module';
import { AccionxIndModule } from './accionxind/accionxind.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    AuthModule,
    UserModule,
    PrismaModule,
    EmpresaModule,
    UsuarioModule,
    GeneralModule,
    GeneralEmpresaModule,
    GeneralPublicModule,
    ReportesModule,
    AccionRegistroModule,
    AccionxloteModule,
    AccionxIndModule,
    UtilesModule,
    RelacionoSnigModule,
    NotificacionesModule,
    GanadooModule,
    CambiarCategoriaModule,
    PassportModule.register({session:true})
  ],
  providers:[
    {
    provide:APP_GUARD,
    useClass:AtGuard,
    }
]
})
export class AppModule {}
