import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class RecoverDto {

  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
  
  }
  