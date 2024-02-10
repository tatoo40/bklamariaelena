import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

  @Injectable()
  export class NotificacionesService {
    
    constructor(private prisma: PrismaService) {}
    public model:string = '';
    public field:string = '';
    
    getGanadoSinPeso(id_empresa:number) {
      
      return this.prisma.$queryRaw`SELECT s.cod_articulo, s.nro_lote, s.cod_identidad, SUM(s.cantidad*s.signo) cantidad, sum(s.cantidad2*s.signo) peso
      FROM cpf_stockaux s, articulos a 
       WHERE s.estado = 'S'
       AND s.id_empresa= ${id_empresa}
       AND s.cod_articulo = a.cod_articulo
       AND a.estado='S'
       AND a.id_empresa=1
       AND a.id_tipo_articulo =1 
      GROUP BY  s.cod_articulo, s.nro_lote, s.cod_identidad
      HAVING SUM(s.cantidad*s.signo)=1 AND SUM(s.cantidad2*s.signo)=0`;


    

  
}
getEntradaSinFactura(id_empresa:number) {
      
  return this.prisma.$queryRaw`select t.nro_lote, t.fecha
  from cpt_movimiento_stock t 
  where t.id_motivo_stk = 1
  AND t.estado = 'S'
  AND t.id_empresa=${id_empresa}
  AND NOT EXISTS (select * 
  from cpt_fact_prov f 
  where f.estado = 'S'
  AND f.id_empresa=${id_empresa} AND f.nro_trans_ref=t.nro_trans)`;




}

  getSanitariaVencida(id_empresa:number) {
      
    return this.prisma.$queryRaw`SELECT s.cod_articulo, s.nro_lote, s.cod_identidad, SUM(s.cantidad*s.signo) cantidad
    FROM cpf_stockaux s, articulos a 
     WHERE s.estado = 'S'
     AND s.id_empresa= ${id_empresa}
     AND s.cod_articulo = a.cod_articulo
     AND a.estado='S'
     AND a.id_empresa=1
     AND a.id_tipo_articulo =1 
     AND NOT EXISTS  (SELECT DISTINCT f.cod_identidad
FROM cpf_registro_sanitario f
WHERE f.fecha BETWEEN CURRENT_DATE - INTERVAL '20 days' AND CURRENT_DATE
AND f.estado='S' AND f.cod_identidad = s.cod_identidad AND f.estado='S' AND f.id_empresa=${id_empresa}) 
    GROUP BY  s.cod_articulo, s.nro_lote, s.cod_identidad
    HAVING SUM(s.cantidad*s.signo)=1 `;


  

}
  getComprasGanado(id_empresa:number) {
      
    return this.prisma.$queryRaw`SELECT c.id, c.nro_trans, c.id_moneda, c.id_titular, c.fecha, c.importe_mo, 
    c.serie_fact_prov, c.nro_fact_prov,  c.importe_total_mo,s.cod_articulo, s.cantidad, s.peso, t.nombre_fantasia,
    ep.descripcion
    FROM public.cpt_fact_prov c, (SELECT nro_trans, cod_articulo, SUM(cantidad*signo) cantidad, sum(cantidad2*signo) peso
                   FROM cpf_stockaux s 
                    WHERE s.estado = 'S'
                    AND s.id_empresa=  ${id_empresa}
                   GROUP BY nro_trans, cod_articulo) s, articulos a, titulares t, cpt_pago_fact_prov p,
                   estado_pago ep
    WHERE c.estado='S'
    AND c.id_empresa =  ${id_empresa}
    AND s.nro_trans = c.nro_trans_ref
    AND s.cod_articulo = a.cod_articulo
    AND a.id_tipo_articulo=1
    AND c.id_titular = t.id
    AND c.nro_trans = p.nro_trans
    AND p.id_estado_pago  = ep.id
    AND a.estado = 'S'
    AND ep.estado = 'S'
    AND t.estado = 'S'
    AND p.estado = 'S'`;

}


getComprasInsumo(id_empresa:number) {
      
  return this.prisma.$queryRaw`SELECT c.id, c.nro_trans, c.id_moneda, c.id_titular, c.fecha, c.importe_mo, 
  c.serie_fact_prov, c.nro_fact_prov,  c.importe_total_mo,s.cod_articulo, s.cantidad, s.peso, t.nombre_fantasia,
  ep.descripcion, u.descripcion_corta as unidad_stock
  FROM public.cpt_fact_prov c, (SELECT s.nro_trans, s.cod_articulo, SUM(s.cantidad*s.signo) cantidad, sum(s.cantidad2*s.signo) peso
                 FROM cpf_stockaux s, articulos a 
                  WHERE s.estado = 'S'
                  AND s.id_empresa= ${id_empresa}
                  AND s.cod_articulo = a.cod_articulo
                  AND a.estado='S'
                  AND a.id_empresa=${id_empresa}
                  AND a.id_tipo_articulo IN (2,3,4)
                 GROUP BY s.nro_trans, s.cod_articulo) s, articulos a, titulares t, cpt_pago_fact_prov p,
                 estado_pago ep, unidades u
  WHERE c.estado='S'
  AND c.id_empresa = ${id_empresa}
  AND s.nro_trans = c.nro_trans
  AND s.cod_articulo = a.cod_articulo
  AND a.id_tipo_articulo IN (2,3,4)
  AND c.id_titular = t.id
  AND c.nro_trans = p.nro_trans
  AND p.id_estado_pago  = ep.id
  AND a.estado = 'S'
  AND ep.estado = 'S'
  AND t.estado = 'S'
  AND p.estado = 'S'
  AND a.id_unidad_stk= u.id`;




}




}
  function withoutProperty(obj, property) {  
    const { [property]: unused, ...rest } = obj

  return rest
}