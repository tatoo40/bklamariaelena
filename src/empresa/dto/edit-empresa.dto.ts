import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    IsInt
  } from 'class-validator';
  
  export class EditEmpresaDto {
    @IsString()
    @IsOptional()
    nombre?: string;
  
    @IsString()
    @IsOptional()
    razon_social?: string;
  
    @IsString()
    @IsOptional()
    rut?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsEmail()
    @IsOptional()
    email_contacto?: string;
    
    @IsString()
    @IsOptional()
    telefono_contacto?: string;    

    @IsString()
    @IsOptional()
    observaciones?: string;  

    @IsInt()
    @IsOptional()
    id_mod?: number;      


  }
  