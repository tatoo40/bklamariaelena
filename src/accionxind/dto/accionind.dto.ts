import { Decimal } from '@prisma/client/runtime';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsInt
} from 'class-validator';

export class AccionMasivaLoteCabezal {


  peso_total_real: number
  peso_total_facturado: number
  cantidad_ganado: number
  fecha:string
  serie_guia:string
  dicose: number
  id_propiedad_ganado:number
  nro_guia:string
  @IsString()
  cod_articulo:string
  id_tipo_peso:number
  id_motivo_stk: number


 

}
