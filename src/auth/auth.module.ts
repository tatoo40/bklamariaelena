import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { SessionSerializer } from './utils/serializer';
import { EmailModule } from 'src/email/email.module';
import { UtilesModule } from 'src/utiles/utiles.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config';




@Module({
  imports: [
    JwtModule.register({}),
    MailerModule.forRootAsync({
      imports:[AuthModule],
      inject: [ConfigService], // Añade esto para indicar las dependencias que necesita la fábrica
      useFactory: async (configService: ConfigService) => ({
        transport: {
          name: configService.get('EMAIL_SERVERNAME'),
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
          tls: {
              rejectUnauthorized: false
          }
        },
        defaults: configService.get('EMAIL_SENDER')
      })
    })
  ],

  controllers: [AuthController],
  providers: [JwtStrategy, AuthService,ConfigService,
    GoogleStrategy,{
    provide:'AUTH_SERVICE',
    useClass:AuthService
  }, SessionSerializer],
})
export class AuthModule {}