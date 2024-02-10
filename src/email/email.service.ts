import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
 
export type SendEmailDto = {

  sender?: string;
  recipients: string;
  subject:string;
  text:string;
  html:string;

}

@Injectable()
export  class EmailService {
  private nodemailerTransport: Mail;
 
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService:MailerService
  ) {}
 
  async sendEmail(dto:SendEmailDto){
    const { sender, recipients, subject, text,html } = dto;
  
    // const sender: string | Address = dto.sender ?? {
    //   name:this.config.get<string>('APPNAME'),
    //   address:this.config.get<string>('EMAIL_SENDER')
    // }
  
  
  
    try{
      const result = await this.mailerService.sendMail({
  
        from:sender,
        to:recipients,
        subject,
        text,
        html
    
      });
      console.log(result)
      return result;
  
    }catch(error){
  
      console.log('error:',error)
  
  
    }
  
  }
}