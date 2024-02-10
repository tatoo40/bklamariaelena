import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class GoogleUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsNumber()
    id?: number;
  
    @IsString()
    @IsOptional()
    displayName?: string;
  }
  