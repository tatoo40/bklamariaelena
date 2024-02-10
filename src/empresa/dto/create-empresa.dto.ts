import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateEmpresaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsString()
    @IsOptional()
    razon_social?: string;
  
    @IsString()
    @IsNotEmpty()
    rut: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsEmail()
    @IsNotEmpty()
    email_contacto: string;
    
    @IsString()
    @IsNotEmpty()
    telefono_contacto: string;    

    @IsString()
    @IsNotEmpty()
    observaciones: string;  

    @IsInt()
    @IsNotEmpty()
    id_mod: number;  
  }
  