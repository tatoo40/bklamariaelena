import { Global, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
   
    MailerModule.forRootAsync({
      imports:[EmailModule],
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
        },
        defaults: configService.get('EMAIL_SENDER')
      })
    })
  ],
  controllers: [EmailController],
  providers: [EmailService,ConfigService]
})
export class EmailModule {}
