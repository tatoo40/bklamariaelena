import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  cod_articulo:string;

  @IsString()
  @IsNotEmpty()
  nombre:string;

  @IsNumber()
  @IsNotEmpty()
  id_unidad_stk:number;

  @IsNumber()
  @IsNotEmpty()  
  id_categoria_ganado:number;

  @IsNumber()
  @IsNotEmpty()
  id_marca_ganado:number;
  
  @IsNumber()
  @IsNotEmpty()
  id_empresa:number;




}
