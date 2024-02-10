import { Decimal } from '@prisma/client/runtime';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsInt
} from 'class-validator';

export class Cpt_altaganadoDto {


  cod_articulo:string
  nro_lote:string
  cod_identidad:string
  dias:number
  meses           :number
  propietario:string
  ubicacion       :string
  tenedor         :string
  status_vida     :string
  errores         :string
  sexo            :string
  cruza           :string
  id_empresa      :number
  fecha_ingreso   :string
  documento_ingreso :string
  fecha_identificacion :string
  fecha_registro    :string
  status_trazabilidad :string
  peso_inicial     :number
  fecha_entrada   :string
  fecha_salida    :string
  id_categoria_ganado   :number
  id_marca_ganado       :number
  id_motivos_stk    :number
  observaciones :string
  anexo_lote :string
  cantidad    :number
  peso_total_facturado     :number
  peso_total_real:number
  cantidad_total    :number
  fecha :string
  serie_guia:string
  nro_guia:string
  id_motivo_mov_stk:number
  carbunco:boolean
  bania_garrapata:boolean
  clostridiosis:boolean
  id_motivo_stk:number
  dicose:number
  lineas:[]
  pesada_muestra:boolean
  id_motivo_sanitario:number
  id_raza_ganado:number
  id_sector:number
  id_sector_destino:number
  id_unidad_stk:number
  id_estado_stock:number
  id_tipo_peso:number
  id_propiedad_ganado:number
  valor_dicose:number
  aplica_sanidad:boolean
  peso:number
  nro_trans_ref:number
  nro_trans:number
  parasitos_internos:boolean
  cod_identidad_madre:string

}
