import { Decimal } from '@prisma/client/runtime';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsInt
} from 'class-validator';

export class AccionMasivaLoteLineas {


  cantidad: number
  cantidad2: number
  cantidad3: number
  fecha:string
  nro_lote:string
  cod_identidad: string
  id_empresa:number
  nro_trans:number
  cod_articulo:string



 

}
