import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

  @Injectable()
  export class ReportesService {
    
    constructor(private prisma: PrismaService) {}
    public model:string = '';
    public field:string = '';
    
    getInventarioStk(id_empresa:number) {
      
      return this.prisma.$queryRaw`SELECT  f.cod_articulo codigo_articulo, a.nombre nombre_articulo,f.nro_lote, f.cod_identidad, dep.id codigo_deposito, dep.nombre as nombre_deposito, f.id_sector codigo_sector, d.nombre as nombre_sector,SUM(f.cantidad*f.signo) cantidad,
      SUM(f.cantidad2*f.signo) kilos,SUM(f.cantidad3*f.signo) kilos_dos, a.id_categoria_ganado codigo_categoria_ganado, g.descripcion nombre_categoria_ganado,
      a.id_marca_ganado codigo_marca_ganado, m.descripcion nombre_marca_ganado,un.descripcion_corta, tart.id as id_tipo_articulo, tart.descripcion as descripcion_tart, d.latitud, d.longitud
            from cpf_stockaux f, articulos a, sectores d, categorias_ganado g, marcas_ganado m, 
			depositos dep, unidades un, tipo_articulo tart
            where f.estado = 'S'
            AND f.id_empresa = ${id_empresa}
            AND a.estado = 'S'
            AND a.id_empresa = ${id_empresa}
          AND f.cod_articulo = a.cod_articulo
          AND f.id_estado_stock=1
          AND f.id_sector = d.id
          AND d.id_deposito = dep.id
          AND f.id_empresa = ${id_empresa}
          AND a.id_categoria_ganado =g.id
          AND a.id_marca_ganado =m.id
          AND un.id = a.id_unidad_stk
		  AND tart.id = a.id_tipo_articulo
      GROUP BY f.cod_articulo, a.nombre,f.nro_lote, f.cod_identidad, dep.id, dep.nombre, f.id_sector, d.nombre, 
      a.id_categoria_ganado, g.descripcion, a.id_marca_ganado, m.descripcion,un.descripcion_corta,tart.id,tart.descripcion, d.latitud, d.longitud
      HAVING SUM(f.cantidad*f.signo)>0`;


    

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