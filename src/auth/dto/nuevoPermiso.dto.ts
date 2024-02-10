import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isDate,
} from 'class-validator';

export class NuevoPermiso {

  @IsNumber()
  @IsNotEmpty()
  id:number;


  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  createdAt:string

  @IsString()
  @IsNotEmpty()
  updatedAt:string

  @IsString()
  @IsNotEmpty()
  estado:string

  @IsNumber()
  @IsNotEmpty()
  id_usuario:number;



  @IsNumber()
  @IsNotEmpty()
  id_seccion:number;

  @IsNumber()
  @IsNotEmpty()
  id_accion:number;



  @IsNumber()
  @IsNotEmpty()
  id_mod:number;

}

