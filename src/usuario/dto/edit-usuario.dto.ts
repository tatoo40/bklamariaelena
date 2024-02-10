import {
  IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditUsuarioDto {
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    nombre?: string;
  
    @IsString()
    @IsOptional()
    apellido?: string;

    @IsString()
    @IsOptional()
    hashRt?: string;
  
    @IsBoolean()
    @IsOptional()
    isRegisteredWithGoogle?: boolean;


    @IsString()
    @IsOptional()
    token_recuperacion_pass: string;

    @IsNumber()
    @IsOptional()
    id_rol: number;

    @IsNumber()
    @IsOptional()
    id_empresa: number;


  }
  