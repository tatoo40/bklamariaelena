 import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import moment = require('moment');


@Injectable()
export class GanadoService {
 
  constructor(private prisma: PrismaService) {}

  getGanando(empresa:number) {

    return this.prisma.$transaction([
      this.prisma.$queryRaw`SELECT cod_articulo, nro_lote, cod_identidad, sum(cantidad*signo) cantidad, sum(cantidad2*signo) cantidad2, sum(cantidad3*signo) cantidad3
      FROM cpf_stockaux where id_estado_stock IN(1)  AND id_empresa=${empresa}
          GROUP BY cod_articulo, nro_lote, cod_identidad HAVING sum(cantidad*signo)>0`,
   
    ])


 
  }
  async getSectorGanado(empresa, arrayCaravanas) {


  
    //obtento todas las carvanas con sus distintos depositos
    const obtengoCaravanasSector: { id_sector: number; nombre: string; cod_identidad: string }[]  = await this.prisma.$queryRaw<[]>`SELECT DISTINCT f.id_sector, dep.nombre, f.cod_identidad FROM cpf_stockaux f, sectores dep where f.id_estado_stock IN(1)  
    AND f.id_empresa = ${empresa}
    AND dep.id_empresa=f.id_empresa
    AND f.id_empresa=${empresa}
    AND dep.id = f.id_sector
    GROUP BY f.id_sector, dep.nombre, f.cod_identidad HAVING sum(f.cantidad*f.signo)>0`;
   
    // Filtrar los objetos del arrayDepositos que tienen cod_identidad en el arrayCaravanas
    const sectoresFiltrados = obtengoCaravanasSector.filter((sector) => arrayCaravanas.includes(sector.cod_identidad));

    // Crear un objeto con los id_deposito y nombre distintos
    const resultado = sectoresFiltrados.reduce((obj, sector) => {
      if (!obj[sector.id_sector]) {
        obj[sector.id_sector] = sector.nombre;
      }
      return obj;
    }, {});

    return resultado;
    
 
  }


  

  async getStockGanadoActivoPrenadas(empresa) {


  
    //obtento todas las carvanas con sus distintos depositos
    const resultado = await this.prisma.$queryRaw<[]>`SELECT DISTINCT f.cod_identidad, f.cod_articulo, f.nro_lote, art.id_categoria_ganado, art.id_marca_ganado,
    cat.descripcion descripcion_categoria, mar.descripcion descripcion_marca, SUM(f.cantidad2*f.signo) peso_actual, cat.sexo, dep.nombre descripcion_sector
    FROM cpf_stockaux f, sectores dep, articulos art, categorias_ganado cat, marcas_ganado mar
    where f.id_estado_stock IN(1)  
    AND f.id_empresa =${empresa}
    AND f.cod_articulo = art.cod_articulo
    AND art.estado='S'
    AND art.id_categoria_ganado = cat.id
    AND art.id_categoria_ganado=4
    AND art.id_marca_ganado = mar.id 
    AND art.id_tipo_articulo = 1
    AND dep.id_empresa=f.id_empresa
    AND f.id_empresa=${empresa}
    AND f.estado='S'
    AND dep.estado='S'
    AND dep.id = f.id_sector
    GROUP BY  f.cod_identidad, f.cod_articulo, art.id_categoria_ganado, art.id_marca_ganado,cat.descripcion ,mar.descripcion , cat.sexo, f.nro_lote, dep.nombre
    HAVING sum(f.cantidad*f.signo)>0`;
   
  

    return resultado;
    
 
  }




  async getStockGanadoActivo(empresa) {


  
    //obtento todas las carvanas con sus distintos depositos
    const resultado = await this.prisma.$queryRaw<[]>`SELECT DISTINCT f.cod_identidad, f.cod_articulo, f.nro_lote, art.id_categoria_ganado, art.id_marca_ganado,
    cat.descripcion descripcion_categoria, mar.descripcion descripcion_marca, SUM(f.cantidad2*f.signo) peso_actual, cat.sexo, dep.nombre descripcion_sector
    FROM cpf_stockaux f, sectores dep, articulos art, categorias_ganado cat, marcas_ganado mar
    where f.id_estado_stock IN(1)  
    AND f.id_empresa =${empresa}
    AND f.cod_articulo = art.cod_articulo
    AND art.estado='S'
    AND art.id_categoria_ganado = cat.id
    AND art.id_marca_ganado = mar.id 
    AND art.id_tipo_articulo = 1
    AND dep.id_empresa=f.id_empresa
    AND f.id_empresa=${empresa}
    AND f.estado='S'
    AND dep.estado='S'
    AND dep.id = f.id_sector
    GROUP BY  f.cod_identidad, f.cod_articulo, art.id_categoria_ganado, art.id_marca_ganado,cat.descripcion ,mar.descripcion , cat.sexo, f.nro_lote, dep.nombre
    HAVING sum(f.cantidad*f.signo)>0`;
   
  

    return resultado;
    
 
  }

  async getArticuloxCatxMar(empresa,id_marca, id_categoria){

    const resultado = await this.prisma.$queryRaw<[]>`SELECT art.cod_articulo
    FROM articulos art
    where art.id_empresa =${empresa} 
    AND art.id_marca_ganado = ${id_marca} 
    AND art.id_categoria_ganado = ${id_categoria}
 `;



    return resultado
  }
  


  async getIndicadoresTotalesAnimales(empresa) {


  
    //obtento todas las carvanas con sus distintos depositos
    const resultado = await this.prisma.$queryRaw<[]>`SELECT SUM(f.cantidad*f.signo) unidades,sum(f.cantidad2* f.signo) Kilos
    FROM cpf_stockaux f, articulos art
    WHERE f.id_estado_stock=1
    AND f.cod_articulo = art.cod_articulo
    AND art.id_tipo_articulo=1
    AND art.id_empresa=${empresa}
    AND f.id_empresa=${empresa}`;
   
  

    return resultado;
    
 
  }

  async getEntradasSemanales(empresa) {


  
    //obtento todas las carvanas con sus distintos depositos
    const resultado = await this.prisma.$queryRaw<[]>`SELECT t.id, t.nro_trans, t.cod_articulo, t.observaciones, art.nombre, t.cantidad_ganado, t.peso_total_real, t.fecha
    ,EXTRACT(WEEK FROM t.fecha::DATE) AS semana_fecha,
    EXTRACT(YEAR FROM t.fecha) AS anio_fecha,
         EXTRACT(YEAR FROM CURRENT_DATE) AS anio_actual,
         EXTRACT(WEEK FROM CURRENT_DATE) AS semana_actual
    FROM public.cpt_movimiento_stock t, articulos art 
    where t.id_motivo_stk=1 AND t.cod_articulo = art.cod_articulo
    AND EXTRACT(YEAR FROM t.fecha)=EXTRACT(YEAR FROM CURRENT_DATE)
    AND EXTRACT(WEEK FROM t.fecha::DATE)=EXTRACT(WEEK FROM CURRENT_DATE)
      AND t.id_empresa=${empresa}
    AND art.id_empresa=${empresa}`;
   
  

    return resultado;
    
 
  }

  async getSalidasSemanales(empresa) {


  
    //obtento todas las carvanas con sus distintos depositos
    const resultado = await this.prisma.$queryRaw<[]>`SELECT t.id, t.nro_trans, t.cod_articulo, t.observaciones, art.nombre, t.cantidad_ganado, t.peso_total_real, t.fecha
    ,EXTRACT(WEEK FROM t.fecha::DATE) AS semana_fecha,
    EXTRACT(YEAR FROM t.fecha) AS anio_fecha,
         EXTRACT(YEAR FROM CURRENT_DATE) AS anio_actual,
         EXTRACT(WEEK FROM CURRENT_DATE) AS semana_actual
    FROM public.cpt_movimiento_stock t, articulos art 
    where t.id_motivo_stk=3 AND t.cod_articulo = art.cod_articulo
    AND EXTRACT(YEAR FROM t.fecha)=EXTRACT(YEAR FROM CURRENT_DATE)
    AND EXTRACT(WEEK FROM t.fecha::DATE)=EXTRACT(WEEK FROM CURRENT_DATE)
    AND t.id_empresa=${empresa}
    AND art.id_empresa=${empresa}`;
   
  

    return resultado;
    
 
  }


  async getDepositoGanado(empresa, arrayCaravanas) {


  
    //obtento todas las carvanas con sus distintos depositos
    const obtengoCaravanasSector: { id_sector: number; nombre: string; cod_identidad: string }[]  = await this.prisma.$queryRaw<[]>`SELECT DISTINCT f.id_sector, dep.nombre, f.cod_identidad FROM cpf_stockaux f, sectores dep where f.id_estado_stock IN(1)  
    AND f.id_empresa ==${empresa}
    AND dep.id_empresa=f.id_empresa
    AND f.id_empresa=${empresa}
    AND dep.id = f.id_sector
    AND f.estado='S'
    AND dep.estado='S'
    GROUP BY f.id_sector, dep.nombre, f.cod_identidad HAVING sum(f.cantidad*f.signo)>0`;
   
    // Filtrar los objetos del arrayDepositos que tienen cod_identidad en el arrayCaravanas
    const sectoresFiltrados = obtengoCaravanasSector.filter((sector) => arrayCaravanas.includes(sector.cod_identidad));

    // Crear un objeto con los id_deposito y nombre distintos
    const resultado = sectoresFiltrados.reduce((obj, sector) => {
      if (!obj[sector.id_sector]) {
        obj[sector.id_sector] = sector.nombre;
      }
      return obj;
    }, {});

    return resultado;
    
 
  }


  getGanadoCostoById(
   
    ganadoId: string,
 ) {
   return  this.prisma.$transaction([
     this.prisma.$queryRaw`SELECT cod_articulo, nro_lote,id_empresa, cod_identidad, sum(importe_mo*signo) importe_mo, sum(importe_mn*signo) importe_mn, sum(importe_tr*signo) importe_tr,
     id_unidad_stk,id_tipo_costo,tc
     FROM cpf_costos where cod_identidad = ${ ganadoId }
         GROUP BY cod_articulo, nro_lote,id_empresa, cod_identidad,id_unidad_stk,id_tipo_costo,tc HAVING sum(importe_mo*signo)>0`,
  
   ])
 }


  getGanadoById(
   
     ganadoId: string,


  ) {
    return  this.prisma.$transaction([
      this.prisma.$queryRaw`SELECT s.cod_articulo, s.nro_lote, s.id_empresa, s.cod_identidad, sum(s.cantidad*s.signo) cantidad, sum(s.cantidad2*s.signo) cantidad2, sum(s.cantidad3*s.signo) cantidad3,s.id_motivo_stk, s.id_unidad_stk,s.id_estado_stock,s.id_sector,
a.id_categoria_ganado, a.id_marca_ganado
FROM cpf_stockaux s, articulos a where s.id_estado_stock IN(1) AND cod_identidad = '${ ganadoId }'
AND s.cod_articulo=a.cod_articulo
GROUP BY a.id_categoria_ganado, a.id_marca_ganado, s.cod_articulo, s.nro_lote, s.cod_identidad , s.id_empresa,s.id_unidad_stk,s.id_estado_stock,s.id_sector,s.id_motivo_stk HAVING sum(s.cantidad*s.signo)>0`,
   
    ])
  }


  getGanadoIdentidad() {


    return this.prisma.$transaction([
     this.prisma.$queryRaw`SELECT cod_identidad 
     FROM cpt_identidad`,
  
   ])

 }


  async getGanadoByIdSec(
   
    ganadoId: number,
 ) {
        const resultado = await this.prisma.$queryRaw<[]>`SELECT DISTINCT f.cod_identidad, f.cod_articulo, art.id_categoria_ganado, art.id_marca_ganado,
        cat.descripcion descripcion_categoria, mar.descripcion descripcion_marca, SUM(f.cantidad2*f.signo) peso_actual, cat.sexo
        FROM cpf_stockaux f, sectores dep, articulos art, categorias_ganado cat, marcas_ganado mar
        where f.id_estado_stock IN(1)  
        AND f.cod_identidad =${ganadoId}
        AND f.cod_articulo = art.cod_articulo
        AND art.estado='S'
        AND art.id_categoria_ganado = cat.id
        AND art.id_marca_ganado = mar.id 
        AND art.id_tipo_articulo = 1
        AND dep.id_empresa=f.id_empresa
        AND f.estado='S'
        AND dep.estado='S'
        AND dep.id = f.id_sector
        GROUP BY  f.cod_identidad, f.cod_articulo, art.id_categoria_ganado, art.id_marca_ganado,cat.descripcion ,mar.descripcion , cat.sexo
        HAVING sum(f.cantidad*f.signo)>0`;
      


        return resultado;
 }


  async getExisteCaravana(ganadoId:string) {
    const result = await this.prisma.$queryRaw`
      SELECT *  FROM cpt_identidad WHERE cod_identidad = ${ganadoId}
    `;
    
    return result[0];
  }



  getRegistroSanitarioGanadoById(
   
    ganadoId: string,
 ) {


   return  this.prisma.$transaction([
     this.prisma.$queryRaw`SELECT cod_articulo, nro_lote,id_empresa, cod_identidad, sum(cantidad*signo) cantidad, sum(cantidad2*signo) cantidad2, sum(cantidad3*signo) cantidad3,
     id_padre,id_motivo_sanitario
     FROM cpf_registro_sanitario where cod_identidad = ${ ganadoId }
         GROUP BY cod_articulo, nro_lote,id_empresa, cod_identidad, id_padre,id_motivo_sanitario HAVING sum(cantidad*signo)>0`
  
   ])
 }


async obtengoArticuloGanado(raza:string, sexo:string, edad:number){



 const query=`
 SELECT art.cod_articulo, art.id_marca_ganado, art.id_categoria_ganado 
 FROM categorias_ganado cg, marcas_ganado mg, articulos art
 WHERE mg.id_tipo_ganado = 1
   AND cg.id_tipo_ganado = 1
   AND mg.estado = 'S'
   AND cg.estado = 'S'
   AND mg.abreviacion = '${ raza }'
   AND cg.sexo = '${ sexo }'
   AND art.estado = 'S'
   AND art.id_categoria_ganado = cg.id
   AND art.id_marca_ganado = mg.id
   AND cg.rango_dia_inicio <= ${edad} AND ${edad} <= cg.rango_dia_fin
   AND cg.predeterminada = true
 `;
 

  const resultado = await this.prisma.$queryRawUnsafe(query);

  return resultado[0];

}





async obtengoArticulo(raza:string, categoria:string){



  const query=`
  SELECT art.cod_articulo, art.id_marca_ganado, art.id_categoria_ganado 
  FROM articulos art
  WHERE art.estado = 'S'
  AND art.id_marca_ganado = '${raza}'
  AND art.id_categoria_ganado = '${categoria}'
   
  `;
  
 
   const resultado = await this.prisma.$queryRawUnsafe(query);
 
   return resultado[0];
 
 }




async obtengoSexoAnimales(categoria:number, raza:number){

  const query=`
  SELECT cg.sexo
  FROM categorias_ganado cg
  WHERE cg.id_tipo_ganado = 1
    AND cg.estado = 'S'
    AND cg.id = ${ categoria }
    `;
  
 
   const resultado = await this.prisma.$queryRawUnsafe(query);
 
   return resultado[0];

}
 

async ctrlAnimalLoteYaProcesado(lineas) {
  let ctrlPaso = true;
  // Obtengo todos los artículos que están ingresados.
  let arrayIdentidades = await this.getGanadoIdentidad();
 
  console.log('aca adentro')
  console.log(arrayIdentidades)
  //console.log(arrayIdentidades);

  lineas.forEach((linea) => {
    // Comparo cada elemento de 'lineas' con los elementos de 'arrayIdentidades'
    if (arrayIdentidades.includes(linea.EID)) {
      ctrlPaso = false; // Si hay una coincidencia, cambio 'existe' a true
    }
  });

  return ctrlPaso; // Devuelvo el valor de 'existe' al finalizar la comparación
}


async ctrlAnimalLoteYaProcesadoInd(caravana) {
  let ctrlPaso = true;
  // Obtengo todos los artículos que están ingresados.
  //let arrayIdentidades = await this.getGanadoIdentidad();
 
  let arrayIdentidades: { cod_identidad: string; }[][] = (await this.getGanadoIdentidad()).map((subArray: any[]) =>
    subArray.map(objeto => ({ cod_identidad: objeto.cod_identidad }))
  );


  //let arrayIdentidades: { cod_identidad: string; }[][] = await this.getGanadoIdentidad();

  const data: { cod_identidad: string }[][] = arrayIdentidades;


 
  const estaPresente = data.some(subArray =>
    subArray.some(objeto => objeto.cod_identidad === caravana)
  );
  
  if (estaPresente) {

    ctrlPaso = false;
 
  }



  return ctrlPaso; // Devuelvo el valor de 'existe' al finalizar la comparación
}



async registroSanitario(dto,proceso,nro_trans){

  let pasaProceso = true;
  const format = 'YYYY-MM-DDT00:00:00.000Z';
  const myDate = dto.fecha;
  const formattedDate = moment(
    myDate,
    'DD-MM-YYYY',
  ).format(format);

  
  let cabezalSanitario: any;
  let error_proceso = false;
  let error_mensaje = '';



    switch (proceso) {
      case 6:


          cabezalSanitario =
          await this.prisma.cpt_registro_sanitario.create(
            {
              data: {
                nro_trans: nro_trans,
                peso_total_real:
                  dto.peso,
                peso_total_facturado:
                  dto.peso,
                cantidad_ganado:1,
                fecha: formattedDate,
                en_alta: true,
                id_motivo_sanitario: proceso,
                id_empresa: dto.id_empresa,
              },
            },
          );



          const lineasSanitarias =
          await this.prisma.cpp_registro_sanitario.create(
            {
              data: {
                nro_trans: nro_trans,
                cantidad: 1,
                cantidad2: dto.peso,
                cantidad3: dto.peso,
                fecha: formattedDate,
                nro_lote:'0',
                cod_identidad:dto.cod_identidad,
                id_empresa: dto.id_empresa,
                cod_articulo:dto.cod_articulo,
                id_padre:12,
                id_motivo_sanitario:dto.id_motivo_sanitario,
                resultadoTest:dto.resultadoTest
            
              },
            },
          );

          await this.prisma.cpf_registro_sanitario.create(
            {
              data: {
                nro_trans: nro_trans,
                cantidad: dto.cantidad,
                cantidad2: dto.peso,
                cantidad3: dto.peso,
                fecha: formattedDate,
                signo:1,
                nro_lote:'0',
                cod_identidad:dto.cod_identidad,
                id_empresa: dto.id_empresa,
                cod_articulo:dto.cod_articulo,
                id_padre:12,
                id_motivo_sanitario:dto.id_motivo_sanitario,
                resultadoTest:dto.resultadoTest
              },
            },
          );



            //TENGO QUE CAMBIAR LA CATEGORIA DEL ARTTICULO
            // SI EL RESULTADO DEL TEST ES POSITIVO
            // Y PASAR LOS COSTOS

            //obtengo de cada animal los datos para dar de baja
            var animalAProcesarString: any =
              await this.getGanadoById(dto.cod_identidad);



              
            var animalAProcesar =
              animalAProcesarString[0][0];

              let lineasCpfStockaux =
              await this.prisma.cpf_stockaux.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad:
                      animalAProcesar.cantidad,
                    cantidad2:
                      animalAProcesar.cantidad2,
                    cantidad3:
                      animalAProcesar.cantidad3,
                    signo: -1,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:dto.cod_identidad,
                    fecha: formattedDate,
                    id_motivo_stk:12,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
                    id_unidad_stk:
                      animalAProcesar.id_unidad_stk,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    id_estado_stock:
                      animalAProcesar.id_estado_stock,
                      id_sector:
                      animalAProcesar.id_sector,
                  },
                },
              );
    
            let categoriaResultado ='';

            if  (dto.resultadoTest){
              // es porque es positivo y tengo que cambiar el articulo 
              categoriaResultado = '4';

            }else{

              categoriaResultado = '8';

            }
            const articuloNuevo = await this.obtengoArticulo(animalAProcesar.id_marca_ganado, categoriaResultado)

            
            lineasCpfStockaux =
              await this.prisma.cpf_stockaux.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad:
                      animalAProcesar.cantidad,
                    cantidad2:
                      animalAProcesar.cantidad2,
                    cantidad3:
                      animalAProcesar.cantidad3,
                    signo: 1,
                    nro_lote:
                      dto.nro_lote,
                    cod_identidad:dto.cod_identidad,
                    fecha: formattedDate,
                    id_motivo_stk:parseInt(dto.id_motivos_stk,10),
                    cod_articulo:articuloNuevo.cod_articulo,
                    id_unidad_stk:
                      animalAProcesar.id_unidad_stk,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    id_estado_stock:1,
                      id_sector:animalAProcesar.id_sector
                  },
                },
              );

              
             await this.cambioCostos(dto.cod_identidad,articuloNuevo.cod_articulo,dto.cod_identidad, dto.fecha, nro_trans);


      

          return {
            error:false,
            mensaje:''
    
          }

      break;
      default:
      //obtengo articulo del motivo sanitario
      const insumoPromise = this.obtengoInsumo(proceso, dto.id_empresa);
      // tengo que evaluar la dosificacion por animal

      const insumo: any = await insumoPromise;
      console.log("Fetched insumo:", insumo);
      //insumo = insumo[0];
      //console.log(insumo.cod_articulo);
      //primer problema si no encuentro insumos en la base
      if (insumo.cod_articulo !=='') {
        //agrego en cpf_consumos
        const cantidadConsumida = 1 * insumo.dosis;
        //console.log('aca')
        //console.log(cantidadConsumida);
        

        //segundo problema si trato de consumir mas del disponible
        if (cantidadConsumida>insumo.cantidad_stk){
          // tengo que cortar porque no hay stock del insumo
          error_proceso = true;
          error_mensaje += 'Esta queriendo consumir mas cantidad del articulo '+insumo.nombre+' que la que existe en stock:'+insumo.cantidad_stk+' '+insumo.descripcion_corta+'<br>';

          return {
            error:true,
            mensaje:error_mensaje
    
          }
       
        }


        cabezalSanitario =
        await this.prisma.cpt_registro_sanitario.create(
          {
            data: {
              nro_trans: nro_trans,
              peso_total_real:
                dto.peso,
              peso_total_facturado:
                dto.peso,
              cantidad_ganado:1,
              fecha: formattedDate,
              en_alta: true,
              id_motivo_sanitario: proceso,
              id_empresa: dto.id_empresa,
            },
          },
        );



        const lineasSanitarias =
        await this.prisma.cpp_registro_sanitario.create(
          {
            data: {
              nro_trans: nro_trans,
              cantidad: 1,
              cantidad2: dto.peso,
              cantidad3: dto.peso,
              fecha: formattedDate,
              nro_lote:'0',
              cod_identidad:dto.cod_identidad,
              id_empresa: dto.id_empresa,
              cod_articulo:dto.cod_articulo,
              id_padre:12,
              id_motivo_sanitario:dto.id_motivo_sanitario
            },
          },
        );

        await this.prisma.cpf_registro_sanitario.create(
          {
            data: {
              nro_trans: nro_trans,
              cantidad: dto.cantidad,
              cantidad2: dto.peso,
              cantidad3: dto.peso,
              fecha: formattedDate,
              signo:1,
              nro_lote:'0',
              cod_identidad:dto.cod_identidad,
              id_empresa: dto.id_empresa,
              cod_articulo:dto.cod_articulo,
              id_padre:12,
              id_motivo_sanitario:dto.id_motivo_sanitario
            },
          },
        );




        //const insumo:any = await this.obtengoInsumo(2, dto.id_empresa);
        //le asigno el valor al bicho por este remedio
       
        await this.prisma.cpf_costos.create({
          data: {

        
            nro_trans:nro_trans,
            importe_mo:(insumo.precio_unitario_tr/insumo.cantidad_compra) * insumo.dosis,
            importe_mn:(insumo.precio_unitario_mn/insumo.cantidad_compra)  * insumo.dosis,
            importe_tr:(insumo.precio_unitario_tr/insumo.cantidad_compra)  * insumo.dosis,
            tc:insumo.tc,
            signo:1,
            nro_lote:dto.nro_lote,
            cod_identidad:dto.cod_identidad,
            fecha:formattedDate,
            nro_trans_ref:dto.nro_trans_ref,
            id_empresa: dto.id_empresa,
            cod_articulo:dto.cod_articulo,
            id_unidad_stk:1,
            id_tipo_costo:1
            

          }});
        



        const cabezalConsumo =
        await this.prisma.cpf_consumos.create(
          {
            data: {
              nro_trans: nro_trans,
              cantidad:cantidadConsumida,
              cantidad2:0,
              cantidad3:0,
              signo:1,
              cod_articulo: insumo.cod_articulo,
              fecha: formattedDate,
              id_motivo_stk: parseInt(dto.id_motivos_stk,10),
              id_unidad_stk: insumo.id_unidad_stk,
              id_empresa: dto.id_empresa,
              id_sector: 7,
              id_estado_stock: 1,
            },
          },
        );

        //bajo de la cpf_Stockaux el consumo
        const cabezalStock =
        await this.prisma.cpf_stockaux.create(
          {
            data: {
              nro_trans: nro_trans,
              cantidad: cantidadConsumida,
              cantidad2: 0,
              cantidad3: 0,
              signo: -1,
              nro_lote:'0',
              cod_identidad:'0',
              fecha: formattedDate,
              id_motivo_stk: parseInt(dto.id_motivos_stk,10),
              cod_articulo:insumo.cod_articulo,
              id_unidad_stk:insumo.id_unidad_stk,
              id_empresa: dto.id_empresa,
              id_estado_stock:1,
              id_sector: 7,
            },
          },
        );


        return {
          error:false,
          mensaje:''
  
        }

      }else{
        return {
          error:true,
          mensaje:error_mensaje
  
        }
      }


      break;
    }



}

async obtengoRegistrosSanitarios(caravana:string){


  console.log(caravana);
  
    const registros =  await this.prisma.$queryRaw`select  sum(cantidad*signo) cantidad, sum(cantidad2*signo) cantidad2, sum(cantidad3* signo) cantidad3
    , nro_lote, cod_identidad, cod_articulo, id_empresa, id_motivo_sanitario, id_padre
    from cpf_registro_sanitario
    where cod_identidad = ${caravana}
    GROUP by  nro_lote, cod_identidad, cod_articulo, id_empresa, id_motivo_sanitario, id_padre
    HAVING SUM(cantidad*signo)>1`;
  
  
    //console.log(insumo);
    return registros;
  
  }

  
  async obtengoCostos(caravana:string){


    console.log(caravana);
    
      const registros =  await this.prisma.$queryRaw`select  sum(importe_mo*signo) importe_mo, sum(importe_mn*signo) importe_mn, sum(importe_tr* signo) importe_tr 
      , nro_lote, cod_identidad, nro_trans_ref, id_unidad_stk,cod_articulo, id_empresa, id_tipo_costo, tc
      from cpf_costos
      where cod_identidad = ${caravana}
      GROUP by  nro_lote, cod_identidad, nro_trans_ref, id_unidad_stk,cod_articulo, id_empresa, id_tipo_costo, tc
      HAVING SUM(importe_mo*signo)>1`;
    
    
      //console.log(insumo);
      return registros;
    
    }


  
    async cambioCostos(caravana_a_cambiar:string, cod_articulo_nuevo:string, caravana_nueva:string, fecha, nro_trans):Promise<boolean>{

      const format = 'YYYY-MM-DDT00:00:00.000Z';
      const myDate = fecha;
      const formattedDate = moment(
        myDate,
        'DD-MM-YYYY',
      ).format(format);


      const costosAnimal:any = await this.obtengoCostos(caravana_a_cambiar);

                    
      if (costosAnimal && costosAnimal.length > 0) {
        for (let i = 0; i < costosAnimal.length; ++i) {
          const registro = costosAnimal[i];
      

            await this.prisma.cpf_costos.create({
              data: {
                nro_trans: nro_trans,

                importe_mn: registro.importe_mn,
                importe_mo: registro.importe_mo,
                importe_tr: registro.importe_tr,
                nro_lote:registro.nro_lote,
                cod_identidad:registro.cod_identidad,
                nro_trans_ref:registro.nro_trans_ref,
                id_unidad_stk:registro.id_unidad_stk,
                cod_articulo:registro.cod_articulo,
                id_empresa:registro.id_empresa,
                id_tipo_costo:registro.id_tipo_costo,
                tc:registro.tc,
                fecha: formattedDate,
                signo: -1,

              },
            });

            await this.prisma.cpf_costos.create({
              data: {
                nro_trans: nro_trans,

                importe_mn: registro.importe_mn,
                importe_mo: registro.importe_mo,
                importe_tr: registro.importe_tr,
                nro_lote:registro.nro_lote,
                cod_identidad:caravana_nueva,
                nro_trans_ref:registro.nro_trans_ref,
                id_unidad_stk:registro.id_unidad_stk,
                cod_articulo:cod_articulo_nuevo,
                id_empresa:registro.id_empresa,
                id_tipo_costo:registro.id_tipo_costo,
                tc:registro.tc,
                fecha: formattedDate,
                signo: 1,

              },
            });


          
        }

        return true;

      }else{

        return false;

      }


      
        
      
}


async cambioCostosStock(caravana_a_cambiar:string, cod_articulo_nuevo:string, caravana_nueva:string, fecha, nro_trans, id_motivo_stk):Promise<boolean>{

  const format = 'YYYY-MM-DDT00:00:00.000Z';
  const myDate = fecha;
  const formattedDate = moment(
    myDate,
    'DD-MM-YYYY',
  ).format(format);



  var animalAProcesarString: any =
  await this.getGanadoById(caravana_a_cambiar);



  
var animalAProcesar =
  animalAProcesarString[0][0];

  let lineasCpfStockaux =
  await this.prisma.cpf_stockaux.create(
    {
      data: {
        nro_trans: nro_trans,
        cantidad:
          animalAProcesar.cantidad,
        cantidad2:
          animalAProcesar.cantidad2,
        cantidad3:
          animalAProcesar.cantidad3,
        signo: -1,
        nro_lote:
          animalAProcesar.nro_lote,
        cod_identidad:animalAProcesar.cod_identidad,
        fecha: formattedDate,
        id_motivo_stk:id_motivo_stk,
        cod_articulo:
          animalAProcesar.cod_articulo,
        id_unidad_stk:
          animalAProcesar.id_unidad_stk,
        id_empresa:
          animalAProcesar.id_empresa,
        id_estado_stock:
          animalAProcesar.id_estado_stock,
          id_sector:
          animalAProcesar.id_sector,
      },
    },
  );







  lineasCpfStockaux =
  await this.prisma.cpf_stockaux.create(
    {
      data: {
        nro_trans: nro_trans,
        cantidad:
          animalAProcesar.cantidad,
        cantidad2:
          animalAProcesar.cantidad2,
        cantidad3:
          animalAProcesar.cantidad3,
        signo: 1,
        nro_lote: animalAProcesar.nro_lote,
        cod_identidad:caravana_nueva,
        fecha: formattedDate,
        id_motivo_stk:id_motivo_stk,
        cod_articulo:cod_articulo_nuevo,
        id_unidad_stk:
          animalAProcesar.id_unidad_stk,
        id_empresa:
          animalAProcesar.id_empresa,
        id_estado_stock:1,
          id_sector:animalAProcesar.id_sector
      },
    },
  );






  const costosAnimal:any = await this.obtengoCostos(caravana_a_cambiar);

                
  if (costosAnimal && costosAnimal.length > 0) {
    for (let i = 0; i < costosAnimal.length; ++i) {
      const registro = costosAnimal[i];
  

        await this.prisma.cpf_costos.create({
          data: {
            nro_trans: nro_trans,

            importe_mn: registro.importe_mn,
            importe_mo: registro.importe_mo,
            importe_tr: registro.importe_tr,
            nro_lote:registro.nro_lote,
            cod_identidad:registro.cod_identidad,
            nro_trans_ref:registro.nro_trans_ref,
            id_unidad_stk:registro.id_unidad_stk,
            cod_articulo:registro.cod_articulo,
            id_empresa:registro.id_empresa,
            id_tipo_costo:registro.id_tipo_costo,
            tc:registro.tc,
            fecha: formattedDate,
            signo: -1,

          },
        });

        await this.prisma.cpf_costos.create({
          data: {
            nro_trans: nro_trans,

            importe_mn: registro.importe_mn,
            importe_mo: registro.importe_mo,
            importe_tr: registro.importe_tr,
            nro_lote:registro.nro_lote,
            cod_identidad:caravana_nueva,
            nro_trans_ref:registro.nro_trans_ref,
            id_unidad_stk:registro.id_unidad_stk,
            cod_articulo:cod_articulo_nuevo,
            id_empresa:registro.id_empresa,
            id_tipo_costo:registro.id_tipo_costo,
            tc:registro.tc,
            fecha: formattedDate,
            signo: 1,

          },
        });


      
    }

    return true;

  }else{

    return false;

  }


  
    
  
}

async obtengoInsumo(insumoId:number, empresaId:number){

console.log(insumoId)
console.log(empresaId);

  const insumo =  await this.prisma.$queryRaw`SELECT ms.id, ms.descripcion,  ms.frecuencia,  ms.recurrente,  
  ms.unidad_frecuencia,  ms.dosis,  ms.cod_articulo, art.id_unidad_stk,stock.cantidad_stk, 
art.nombre, uni.descripcion_corta, ultima_compra.precio_unitario_tr, ultima_compra.precio_unitario_mn, ultima_compra.valor tc,
ultima_compra.cantidad_stk cantidad_compra
    FROM public.motivos_sanitarios ms, articulos art, (SELECT cod_articulo, sum(cantidad*signo) cantidad_stk 
                               FROM cpf_stockaux cpf 
                              GROUP BY cod_articulo) stock, unidades uni,
                  (SELECT f.cod_articulo, tc.valor, max(f.fecha) fecha,
  ROUND(CASE when f.id_moneda = 1 then max(f.precio_unitario)/ tc.valor 
  ELSE MAX(f.precio_unitario) END,2) precio_unitario_tr, 
  ROUND(CASE when f.id_moneda = 1 then max(f.precio_unitario) 
  ELSE MAX(f.precio_unitario)*tc.valor END,2) precio_unitario_mn,f.cantidad_stk
                  FROM cpp_fact_prov f, tipo_cambio_diario tc
                  WHERE f.estado='S'
                  AND date(f.fecha) = date(tc.fecha)
                  AND f.estado='S'
                  AND tc.estado='S'
                  AND f.id_empresa=${empresaId}
                  GROUP BY f.cod_articulo, f.id_moneda,tc.valor,f.cantidad_stk) ultima_compra
    WHERE ms.id=${insumoId}
    AND ms.estado='S' AND ms.cod_articulo = art.cod_articulo
  AND art.id_unidad_stk = uni.id
    AND stock.cod_articulo = ms.cod_articulo
  AND ms.cod_articulo = ultima_compra.cod_articulo`;


  //console.log(insumo);
  return insumo[0];

}


}
 

async function rollback(proceso:string,nroTrans:number) {
  
  switch (proceso){
    case 'compraganadomasiva':
     

      await this.prisma.cpt_movimiento_stock.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
    
      await this.prisma.cpp_movimiento_stock.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
      await this.prisma.cpt_registro_sanitario.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
      await this.prisma.cpp_registro_sanitario.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
      await this.prisma.cpf_registro_sanitario.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });      
      await this.prisma.cpf_consumos.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
      await this.prisma.cpf_stockaux.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
      await this.prisma.cpf_costos.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });


      await this.prisma.cpf_log.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });    

      
      
      

    break;
  }

}