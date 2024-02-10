import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CompanyDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsString()
    @IsNotEmpty()
    razon_social: string;  
  
    @IsEmail()
    @IsNotEmpty()
    email_contacto: string;
  
    @IsString()
    @IsNotEmpty()
    direccion: string;
  
    @IsNotEmpty()
    @IsString()
    rut: string;
   
    @IsNotEmpty()
    @IsString()
    telefono_contacto: string;

    @IsOptional()
    @IsString()
    observaciones: string;    

    @IsOptional()
    @IsString()
    token: string;   

    @IsBoolean()
    aprobada: boolean;    


    @IsBoolean()
    activa: boolean;    

    
  
  }
  