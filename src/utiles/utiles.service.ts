import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';
import * as moment from 'moment';
import { GanadoService } from 'src/ganado/ganado.service';

  @Injectable()
  export class UtilesService {
    
    constructor(private prisma: PrismaService, private ganado: GanadoService) {}
    public model:string = '';
    public field:string = '';
    
    getGeneralById(id: number, tabla:string) {
      
      this.model=tabla;
      console.log(this.model)
      return this.prisma[this.model].findFirst({
        where: {
          id,
          estado:'S'
        },
      });

    }

    getFacturasProv(id_empresa:number) {
      
      return this.prisma.$queryRaw`Select f.id, f.nro_trans, f.importe_mo, f.importe_mn, f.importe_tr, 
      f.importe_iva_basico_mo,
      f.importe_iva_basico_mn,
      f.importe_iva_basico_tr, 
      f.importe_iva_excento_mo,
      f.importe_iva_excento_mn,
      f.importe_iva_excento_tr, 
      f.importe_iva_minimo_mo,
      f.importe_iva_minimo_mn,
      f.importe_iva_minimo_tr,             
      f.importe_total_mo, f.importe_total_mn, f.importe_total_tr, f.fecha, f.nro_trans_ref, f.serie_fact_prov,
      f.nro_fact_prov,f.id_moneda,f.id_titular,f.id_empresa,f.cod_docum, f.tc,
      t.razon_social, t.nombre_fantasia ,t.rut, t.direccion, t.telefono_contacto,t.email,f.id_titular
      from cpt_fact_prov f, titulares t, monedas m
      where f.estado = 'S'
      AND f.id_empresa = ${id_empresa}
      AND t.estado = 'S'
      AND t.id_empresa = 1
      AND f.id_moneda=m.id
      AND t.id = f.id_titular ORDER BY f.fecha desc`;

    }
   
    getRomaneos(id_empresa:number) {


      return this.prisma.$queryRaw`Select f.id, f.nro_trans, f.importe_mo, f.importe_mn, f.importe_tr, f.importe_iva_mo,
      f.importe_iva_mn,f.importe_iva_tr, 
      f.importe_total_mo, f.importe_total_mn, f.importe_total_tr, f.fecha, f.nro_trans_ref, f.serie_fact_prov,
      f.nro_fact_prov,f.id_moneda,f.id_titular,f.id_empresa,f.cod_docum, f.tc,
      t.razon_social, t.nombre_fantasia ,t.rut, t.direccion, t.telefono_contacto,t.email,f.id_titular, f.porcentaje_rendimiento,
      f.cantidad_kilos_cuarta_balanza,f.cantidad_kilos_declarados,f.cantidad_kilos_salida, f.cantidad_animales, f.nro_romaneo,f.nro_tropa, m.simbolo simbolo_moneda
      from cpt_ingresoromaneo f, titulares t, monedas m
      where f.estado = 'S'
      AND f.id_empresa = ${id_empresa}
      AND t.estado = 'S'
      AND t.id_empresa = 1
      AND f.id_moneda=m.id
      AND t.id = f.id_titular ORDER BY f.fecha desc`;

    }

    getLineasRomaneo(id_empresa:number) {
      
      return this.prisma.$queryRaw`Select l.id, l.nro_trans, l.importe_mo, l.importe_mn, l.importe_tr, l.importe_iva_mo,
      l.importe_iva_mn, l.importe_iva_tr, 
      l.importe_total_mo, l.importe_total_mn,  l.importe_total_tr, l.precio_unitario, l.cantidad,   
	  l.serie_fact_prov,
      l.nro_fact_prov,l.id_moneda,l.cod_docum, l.tc,
      l.cod_articulo, a.nombre nom_articulo,t.razon_social, t.nombre_fantasia ,t.rut, t.direccion, t.telefono_contacto,t.email,f.id_titular,
      l.kilos_salida, l.kilos_calc_declarado, l.kilos_calc_cuarta_balanza,f.nro_romaneo, f.nro_tropa, l.cod_identidad, m.simbolo simbolo_moneda
      from cpt_ingresoromaneo f, cpp_ingresoromaneo l, articulos a, titulares t, monedas m
      where f.estado = 'S'
      AND f.id_empresa = ${id_empresa}
      AND f.nro_trans = l.nro_trans
	  AND l.cod_articulo = a.cod_articulo
      AND l.estado = 'S'  AND t.estado = 'S'
      AND f.id_moneda=m.id
      AND t.id = f.id_titular`;

    }



    getLineasFacturaProv(id_empresa:number) {
      
      return this.prisma.$queryRaw`Select l.id, l.nro_trans, l.importe_mo, l.importe_mn, l.importe_tr, 
      l.importe_iva_basico_mo,
      l.importe_iva_excento_mo,
      l.importe_iva_minimo_mo,
      l.importe_iva_basico_mn,
      l.importe_iva_excento_mn,
      l.importe_iva_minimo_mn,
      l.importe_iva_basico_tr,
      l.importe_iva_excento_tr,
      l.importe_iva_minimo_tr,
      l.importe_total_mo, l.importe_total_mn,  l.importe_total_tr, l.precio_unitario, l.cantidad,   
	    l.serie_fact_prov,
      l.nro_fact_prov,l.id_moneda,l.cod_docum, l.tc,
      l.cod_articulo, a.nombre nom_articulo,t.razon_social, t.nombre_fantasia ,t.rut, t.direccion, t.telefono_contacto,t.email,f.id_titular, m.simbolo simbolo_moneda
      from cpt_fact_prov f, cpp_fact_prov l, articulos a, titulares t, monedas m
      where f.estado = 'S'
      AND f.id_empresa = ${id_empresa}
      AND f.nro_trans = l.nro_trans
	  AND l.cod_articulo = a.cod_articulo
      AND l.estado = 'S'  AND t.estado = 'S'
      AND f.id_moneda=m.id
      AND t.id = f.id_titular`;

    }


    getProveedoresxaFact(empresa:number){

      return this.prisma.$queryRaw`Select t.*  FROM titulares t
      WHERE t.id_tipo_titular  IN (2,3)
      AND estado='S' AND id_empresa=${empresa}`;


    }
    
    getClientesRomaneo(empresa:number){

      return this.prisma.$queryRaw`Select t.*  FROM titulares t
      WHERE t.id_tipo_titular  IN (1)
      AND estado='S' AND id_empresa=${empresa}`;


    }


    async guardarRomaneo(dto){

  //console.log(dto.formData)
  let idRegistroSanitario =0;
  let cabezal: any;
  let cabezalSanitario:any;
  let idRegistro:any;
  let dtoLineas:any;
  let lineas:any;
  let lineasCpfStockaux:any;
  let lineasSanitarias:any;
  let cpf_log:any


   try {
     
           const nro_trans = await this.obtengoNroTrans();
               
               
           const format = 'YYYY-MM-DDT00:00:00.000Z';
           const myDate = dto.fecha;

          
           const formattedDate = moment(myDate).format(format);

           //console.log(formattedDate)


           const formatLote = 'YYYYMMDD';
           const fechaLote =   moment(myDate, 'DD/MM/YYYY').format(formatLote);
           
           //GRABO CABEZAL
           cabezal =
            await this.prisma.cpt_ingresoRomaneo.create({
             data: {
 
               nro_trans: nro_trans,
               importe_mo:dto.importe_mo,
               importe_mn:dto.importe_mn,
               importe_tr:dto.importe_tr,
               importe_total_mo:dto.importe_total_mo,
               importe_total_mn:dto.importe_total_mn,
               importe_total_tr:dto.importe_total_tr,
               importe_iva_mo:dto.importe_iva_mo,
               importe_iva_mn :dto.importe_iva_mn,
               importe_iva_tr:dto.importe_iva_tr,
               fecha:formattedDate,
               nro_trans_ref:dto.nro_trans_ref,
               serie_fact_prov:dto.serie_fact_prov,
               nro_fact_prov:dto.nro_fact_prov,
               cantidad_animales:dto.cantidad_animales,
               cantidad_kilos_declarados:dto.cantidad_kilos_declarados,
               cantidad_kilos_cuarta_balanza:dto.cantidad_kilos_cuarta_balanza,
               cantidad_kilos_salida:dto.cantidad_kilos_salida,
               porcentaje_rendimiento:dto.porcentaje_rendimiento,
               nro_romaneo:dto.nro_romaneo,
               nro_tropa:dto.nro_tropa,
               id_moneda:dto.id_moneda,
               id_titular:dto.id_titular,
               id_empresa:dto.id_empresa,
               tc:dto.tc,
               cod_docum:dto.cod_docum,
               afecta_costo:''

             }});


  

             idRegistro =cabezal.id

             dtoLineas=dto.lineasRomaneo;
    
               console.log(dtoLineas)
             for (var i = 0; i < dtoLineas.length; ++i) {

                 //GRABO LAS LINEAS
                 lineas =
                   await this.prisma.cpp_ingresoRomaneo.create({
                   data: {

                     nro_trans: nro_trans,
                     cantidad: 1,
                     precio_unitario:parseFloat(dtoLineas[i].precio_unitario),
                     importe_mo:dtoLineas[i].importe_mo.toFixed(2),
                     importe_mn:dtoLineas[i].importe_mn.toFixed(2),
                     importe_tr:dtoLineas[i].importe_tr.toFixed(2),
                     importe_total_mo:dtoLineas[i].importe_total_mo.toFixed(2),
                     importe_total_mn:dtoLineas[i].importe_total_mn.toFixed(2),
                     importe_total_tr:dtoLineas[i].importe_total_tr.toFixed(2),
                     importe_iva_mo:dtoLineas[i].importe_iva_mo.toFixed(2),
                     importe_iva_mn:dtoLineas[i].importe_iva_mn.toFixed(2),
                     importe_iva_tr:dtoLineas[i].importe_iva_tr.toFixed(2),
                     fecha:formattedDate,
                     id_empresa: dtoLineas[i].id_empresa,
                     cod_articulo: dtoLineas[i].cod_articulo,
                     serie_fact_prov: dtoLineas[i].serie_fact_prov,
                     nro_fact_prov: dtoLineas[i].nro_fact_prov,
                     id_moneda: dtoLineas[i].id_moneda,
                     id_titular: dtoLineas[i].id_titular,
                     tc: dtoLineas[i].tc,
                     cod_docum: dtoLineas[i].cod_docum,
                     kilos_salida:dtoLineas[i].kilos_salida.toFixed(2),
                     kilos_calc_declarado:parseFloat(dtoLineas[i].kilos_calc_declarado).toFixed(2),
                     kilos_calc_cuarta_balanza:parseFloat(dtoLineas[i].kilos_calc_cuarta_balanza).toFixed(2),
                     importe_mo_peso_salida:dtoLineas[i].importe_mo_peso_salida.toFixed(2),
                     importe_mo_peso_entrada:dtoLineas[i].importe_mo_peso_entrada.toFixed(2),
                     importe_mo_peso_cuarta_balanza:dtoLineas[i].importe_mo_peso_cuarta_balanza.toFixed(2),
                     cod_identidad:dtoLineas[i].cod_identidad
               
              
            
                
                   




                   }});
                 
             } 

                   //cpf_log
                   cpf_log =        
                   await this.prisma.cpf_log.create({
                   data: {
                     nro_trans: nro_trans,
                     id_registro: idRegistro,
                     id_accion:1,
                     id_seccion:53,
                     fecha:formattedDate,
                     descripcion:'Registro Romaneo',
                     cod_docum:'ingRomaneo',
                     observacion:  'Ingreso de romaneo',
                     id_empresa:dto.id_empresa

   
                   }}); 
         
         
       return {

           nro_trans: nro_trans,
           message:'Romaneo ingresado con exito'
  
       }


      }catch (error) {

        if (

          error instanceof
          PrismaClientKnownRequestError

        ) {
   
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              'Credentials taken',
            );
          }
        }
        throw error;
    } 



    }


    async guardarFactProv(dto)    {
      //console.log(dto.formData)
     let idRegistroSanitario =0;
     let cabezal: any;
     let cabezalSanitario:any;
     let idRegistro:any;
     let dtoLineas:any;
     let lineas:any;
     let lineasCpfStockaux:any;
     let lineasSanitarias:any;
     let cpf_log:any


      try {
        
              const nro_trans = await this.obtengoNroTrans();
                  
                  
              const format = 'YYYY-MM-DDT00:00:00.000Z';
              const myDate = dto.fecha;

             
              const formattedDate = moment(myDate).format(format);

              //console.log(formattedDate)


              const formatLote = 'YYYYMMDD';
              const fechaLote =   moment(myDate, 'DD/MM/YYYY').format(formatLote);
              
              //GRABO CABEZAL
              cabezal =
               await this.prisma.cpt_fact_prov.create({
                data: {
    
                  nro_trans: nro_trans,
                  importe_mo:dto.importe_mo,
                  importe_mn:dto.importe_mn,
                  importe_tr:dto.importe_tr,
                  importe_total_mo:dto.importe_total_mo,
                  importe_total_mn:dto.importe_total_mn,
                  importe_total_tr:dto.importe_total_tr,
                  importe_iva_basico_mo:dto.importe_iva_basico_mo,
                  importe_iva_excento_mo:dto.importe_iva_excento_mo,
                  importe_iva_minimo_mo:dto.importe_iva_minimo_mo,
                  importe_iva_basico_mn:dto.importe_iva_basico_mn,
                  importe_iva_excento_mn:dto.importe_iva_excento_mn,
                  importe_iva_minimo_mn:dto.importe_iva_minimo_mn,
                  importe_iva_basico_tr:dto.importe_iva_basico_tr,
                  importe_iva_excento_tr:dto.importe_iva_excento_mn,
                  importe_iva_minimo_tr:dto.importe_iva_minimo_tr,
                  fecha:formattedDate,
                  nro_trans_ref:dto.nro_trans_ref,
                  serie_fact_prov:dto.serie_fact_prov,
                  nro_fact_prov:dto.nro_fact_prov,
                  id_moneda:dto.id_moneda,
                  id_titular:dto.id_titular,
                  id_empresa:dto.id_empresa,
                  tc:dto.tc,
                  cod_docum:dto.cod_docum

                }});


                //GRABO CONTABILIDAD
                await this.prisma.cpf_contaux.create({
                  data: {

                    nro_trans: nro_trans,
                    importe_mo:dto.importe_mo,
                    importe_mn:dto.importe_mn,
                    importe_tr:dto.importe_tr,
                    importe_total_mo:dto.importe_total_mo,
                    importe_total_mn:dto.importe_total_mn,
                    importe_total_tr:dto.importe_total_tr,
                    importe_iva_mo:dto.importe_iva_mo,
                    importe_iva_mn :dto.importe_iva_mn,
                    importe_iva_tr:dto.importe_iva_tr,
                    fecha:formattedDate,
                    nro_trans_ref:dto.nro_trans_ref,
                    serie_fact:dto.serie_fact_prov,
                    nro_fact:dto.nro_fact_prov,
                    id_moneda:dto.id_moneda,
                    id_titular:dto.id_titular,
                    id_empresa:dto.id_empresa,
                    cod_docum:dto.cod_docum,
                    signo:1,
                    tc:dto.tc


  
                  }});


                idRegistro =cabezal.id



                cabezal =
                await this.prisma.cpt_pago_fact_prov.create({
                 data: {
     
                   nro_trans: nro_trans,
                   importe_mo:dto.importe_mo,
                   importe_mn:dto.importe_mn,
                   importe_tr:dto.importe_tr,
                   fecha:formattedDate,
                   nro_trans_ref:nro_trans,
                   serie_fact_prov:dto.serie_fact_prov,
                   nro_fact_prov:dto.nro_fact_prov,
                   id_moneda:dto.id_moneda,
                   id_titular:dto.id_titular,
                   id_empresa:dto.id_empresa,
                   tc:dto.tc,
                   cod_docum:dto.cod_docum,
                   id_estado_pago:1


                 }});

                 idRegistro =cabezal.id


                dtoLineas=dto.orders;
       
                  //console.log(dtoLineas)
                for (var i = 0; i < dtoLineas.length; ++i) {
  
                    //GRABO LAS LINEAS
                    lineas =
                      await this.prisma.cpp_fact_prov.create({
                      data: {
                        nro_trans: nro_trans,
                        cantidad: dtoLineas[i].cantidad,
                        precio_unitario:dtoLineas[i].precio_unitario,
                        importe_mo:dtoLineas[i].importe_mo,
                        importe_mn:dtoLineas[i].importe_mn,
                        importe_tr:dtoLineas[i].importe_tr ,
                        importe_total_mo:dtoLineas[i].importe_total_mo,
                        importe_total_mn:dtoLineas[i].importe_total_mn,
                        importe_total_tr:dtoLineas[i].importe_total_tr,
                        importe_iva_basico_mo:dtoLineas[i].importe_iva_basico_mo,
                        importe_iva_basico_mn:dtoLineas[i].importe_iva_basico_mn,
                        importe_iva_basico_tr:dtoLineas[i].importe_iva_basico_tr,
                        importe_iva_minimo_mo:dtoLineas[i].importe_iva_minimo_mo,
                        importe_iva_minimo_mn:dtoLineas[i].importe_iva_minimo_mn,
                        importe_iva_minimo_tr:dtoLineas[i].importe_iva_minimo_tr,    
                        importe_iva_excento_mo:dtoLineas[i].importe_iva_excento_mo,
                        importe_iva_excento_mn:dtoLineas[i].importe_iva_excento_mn,
                        importe_iva_excento_tr:dtoLineas[i].importe_iva_excento_tr,                                              
                        fecha:formattedDate,
                        id_empresa: dtoLineas[i].id_empresa,
                        cod_articulo: dtoLineas[i].cod_articulo,
                        serie_fact_prov: dtoLineas[i].serie_fact_prov,
                        nro_fact_prov: dtoLineas[i].nro_fact_prov,
                        id_moneda: dtoLineas[i].id_moneda,
                        id_titular: dtoLineas[i].id_titular,
                        tc: dtoLineas[i].tc,
                        cod_docum: dtoLineas[i].cod_docum,
                        cantidad_stk:dtoLineas[i].cantidad_stk,
                        id_tasa_iva_cmp:dtoLineas[i].id_tasa_iva,
                        conv_uni_cmp_a_stk:dtoLineas[i].factor_conv_cmp_a_stk

                      }});

                      const articulo = await this.prisma.articulo.findFirst({
                        where: {
                          cod_articulo:dtoLineas[i].cod_articulo,
                          estado:'S'
                        }
                      });
                      //si es un insumo  o insumo vetreinario lo dejo en almacen y le doy de alta en el stock
                      if(articulo.id_tipo_articulo===2 || articulo.id_tipo_articulo===4){

                        await this.prisma.cpf_stockaux.create({
                          data: {
                            nro_trans: nro_trans,
                            cantidad: dtoLineas[i].cantidad_stk,
                            cantidad2: 0,
                            cantidad3: 0,
                            signo: 1,
                            nro_lote:'0',
                            cod_identidad:'0',                    
                            fecha:formattedDate,
                            id_motivo_stk:1,
                            cod_articulo:dtoLineas[i].cod_articulo,
                            id_unidad_stk:articulo.id_unidad_stk,
                            id_empresa:dtoLineas[i].id_empresa,
                            id_estado_stock:1, 
                            id_sector:7
              
              
                          }});

                      }

                      // SI ES UN SERVICIO Y AFECTA COSTO = si
                      if((articulo.id_tipo_articulo===3) &&  (dto.afecta_costo==='S')){

                
                        try {
                          
                    

                          const bultos =  await this.getBultosDeEntradaACostear(dto.nro_trans_ref,dto.id_empresa)

                          const kilosLote =  await this.getKilosTotLoteACostear(dto.nro_trans_ref,dto.id_empresa)

                        
                          console.log(kilosLote[0].total);
                          console.log(dto.importe_mo)


                          for (const bulto of bultos) {
     


                            //importe total sin iva y hago una regla de tres por los kilos totales del lote
                            let costo_op= (dto.importe_mo * bulto.cantidad3)/kilosLote[0].total;
                            let costo_mn= (dto.importe_mn * bulto.cantidad3)/kilosLote[0].total;
                            let costo_tr= (dto.importe_tr * bulto.cantidad3)/kilosLote[0].total;

                            await this.prisma.cpf_costos.create({
                              data: {
          
                            
                                nro_trans:nro_trans,
                                importe_mo:costo_op,
                                importe_mn:costo_mn,
                                importe_tr:costo_tr,
                                tc:dtoLineas[i].tc,
                                signo:1,
                                nro_lote:bulto.nro_lote,      
                                cod_identidad:bulto.cod_identidad,
                                fecha:formattedDate,
                                nro_trans_ref:dto.nro_trans_ref,
                                cod_articulo:bulto.cod_articulo,
                                id_unidad_stk:1,
                                id_empresa:dto.id_empresa,
                                id_tipo_costo:1
                                
      
                              }});


                          }

                        } catch (error) {
                          // Manejar errores si la promesa es rechazada
                        }

                      }
                } 

                      //cpf_log
                      cpf_log =        
                      await this.prisma.cpf_log.create({
                      data: {
                        nro_trans: nro_trans,
                        id_registro: idRegistro,
                        id_accion:1,
                        id_seccion:33,
                        fecha:formattedDate,
                        descripcion:'Registro factura proveedor',
                        cod_docum:'facturaProv',
                        observacion:  'Ingreso de factura proveedor',
                        id_empresa:dto.id_empresa

      
                      }}); 
            
            
          return {

              nro_trans: nro_trans,
              nro_lote:'LOT-'+fechaLote+'-'+nro_trans+'-'+dto.anexo_lote,
              message:'Factura ingresada con exito'
     
          }

      } catch (error) {

          if (

            error instanceof
            PrismaClientKnownRequestError

          ) {
     
            if (error.code === 'P2002') {
              throw new ForbiddenException(
                'Credentials taken',
              );
            }
          }
          throw error;
      }          
    }  
 

    async obtengoNroTrans() {
      const numerador = await this.prisma.numerador.findFirst({
        where: {
          descripcion:'nro_trans',
          estado:'S'
        },
      });
    
    
      const updateNumerador = await this.prisma.numerador.update({
        where: {
          id: numerador.id,
        },
        data: {
          valor:numerador.valor + 1,
        },
      });
    
    
     
    
      return numerador.valor + 1;
    
    
    }

    getLotesDeEntradaACostear(empresa:number){

      return this.prisma.$queryRaw`SELECT nro_trans, nro_lote
      FROM public.cpt_movimiento_stock
      WHERE id_empresa=${empresa}
      AND id_motivo_stk=1
      order by nro_trans desc`;

    }


    async modificoArticulo(nro_trans:number,Id:string, dto){

      try {



              let idRegistro: any;
              let cabezal: any;




              const articuloSeleccionadoVar:any = await this.ganado.getGanadoById(Id);
              

              console.log('dasdas')
              console.log(dto)

              const articuloSeleccionado = articuloSeleccionadoVar[0][0];

              console.log(articuloSeleccionado)

              if (articuloSeleccionado){


             
                          
                const format = 'YYYY-MM-DDT00:00:00.000Z';
                const myDate = dto.fecha;

              
                const formattedDate = moment(myDate).format(format);

                //console.log(formattedDate)


                const formatLote = 'YYYYMMDD';
                const fechaLote =   moment(myDate, 'DD/MM/YYYY').format(formatLote);

                // bajo stock articulo o carvana antrior
                  await this.prisma.cpf_stockaux.create({
                    data: {
                      nro_trans: nro_trans,
                      cantidad: articuloSeleccionado.cantidad,
                      cantidad2: articuloSeleccionado.cantidad2,
                      cantidad3: articuloSeleccionado.cantidad3,
                      signo: -1,
                      nro_lote:articuloSeleccionado.nro_lote,
                      cod_identidad:articuloSeleccionado.cod_identidad,                    
                      fecha:formattedDate,
                      id_motivo_stk:articuloSeleccionado.id_motivo_stk,
                      cod_articulo:articuloSeleccionado.cod_articulo,
                      id_unidad_stk:articuloSeleccionado.id_unidad_stk,
                      id_empresa:articuloSeleccionado.id_empresa,
                      id_estado_stock:articuloSeleccionado.id_estado_stock, 
                      id_sector:articuloSeleccionado.id_sector


                  }});

                  //subo nuevo articulo
                 
                 
                  cabezal = await this.prisma.cpf_stockaux.create({
                      data: {
                        nro_trans: nro_trans,
                        cantidad: articuloSeleccionado.cantidad,
                        cantidad2: articuloSeleccionado.cantidad2,
                        cantidad3: articuloSeleccionado.cantidad3,
                        signo: 1,
                        nro_lote:articuloSeleccionado.nro_lote,
                        cod_identidad: dto.cod_identidad_nueva ,                    
                        fecha:formattedDate,
                        id_motivo_stk:articuloSeleccionado.id_motivo_stk,
                        cod_articulo:dto.cod_articulo_nuevo,
                        id_unidad_stk:articuloSeleccionado.id_unidad_stk,
                        id_empresa:articuloSeleccionado.id_empresa,
                        id_estado_stock:articuloSeleccionado.id_estado_stock, 
                        id_sector:articuloSeleccionado.id_sector
          
          
                    }});

                    idRegistro =cabezal.id


                    const costoArticuloSeleccionadoVar: any[] = await this.ganado.getGanadoCostoById(Id);

                    const costoArticuloSeleccionado =  costoArticuloSeleccionadoVar[0];

                    console.log(costoArticuloSeleccionado);

                    for (const linea of costoArticuloSeleccionado) {
                      const costoBaja = {
                        nro_trans: nro_trans,
                        importe_mo: linea.importe_mo,
                        importe_mn: linea.importe_mn,
                        importe_tr: linea.importe_tr,
                        tc: linea.tc,
                        signo: -1,
                        nro_lote: linea.nro_lote,
                        cod_identidad: linea.cod_identidad,
                        fecha: formattedDate,
                        nro_trans_ref: nro_trans,
                        cod_articulo: linea.cod_articulo,
                        id_unidad_stk: linea.id_unidad_stk,
                        id_empresa: linea.id_empresa,
                        id_tipo_costo: linea.id_tipo_costo
                      };
                    
                      const costoAlta = {
                        nro_trans: nro_trans,
                        importe_mo: linea.importe_mo,
                        importe_mn: linea.importe_mn,
                        importe_tr: linea.importe_tr,
                        tc: linea.tc,
                        signo: 1,
                        nro_lote: linea.nro_lote,
                        cod_identidad: dto.cod_identidad_nueva,
                        fecha: formattedDate,
                        nro_trans_ref: nro_trans,
                        cod_articulo: dto.cod_articulo_nuevo,
                        id_unidad_stk: linea.id_unidad_stk,
                        id_empresa: linea.id_empresa,
                        id_tipo_costo: linea.id_tipo_costo
                      };
                    
                      await this.prisma.cpf_costos.create({ data: costoBaja });
                      await this.prisma.cpf_costos.create({ data: costoAlta });
                    }


                    const regSanitarioArticuloSeleccionadoVar: any[] = await this.ganado.getRegistroSanitarioGanadoById(Id);

                    const regSanitarioArticuloSeleccionado =  regSanitarioArticuloSeleccionadoVar[0];

                    for (const linea of regSanitarioArticuloSeleccionado) {




                      const regSanitarioBaja = {
        
                        nro_trans:nro_trans,
                        cantidad: linea.cantidad,
                        cantidad2: linea.cantidad,
                        cantidad3: linea.cantidad3,
                        fecha: formattedDate,
                        signo:-1,
                        nro_lote:linea.nro_lote,
                        cod_identidad:linea.cod_identidad,
                        id_empresa: linea.id_empresa,
                        cod_articulo:linea.cod_articulo,
                        id_padre:linea.id_padre,
                        id_motivo_sanitario: linea.id_motivo_sanitario,
                      };
                    
                      const regSanitarioAlta = {
        
                        nro_trans:nro_trans,
                        cantidad: linea.cantidad,
                        cantidad2: linea.cantidad,
                        cantidad3: linea.cantidad3,
                        fecha: formattedDate,
                        signo:1,
                        nro_lote:linea.nro_lote,
                        cod_identidad:dto.cod_identidad_nueva,
                        id_empresa: linea.id_empresa,
                        cod_articulo:dto.cod_articulo_nuevo,
                        id_padre:linea.id_padre,
                        id_motivo_sanitario: linea.id_motivo_sanitario,
                      };
                    
                      await this.prisma.cpf_registro_sanitario.create({ data: regSanitarioBaja });
                      await this.prisma.cpf_registro_sanitario.create({ data: regSanitarioAlta });

                    }

                    await this.prisma.cpf_log.create({
                    data: {
                      nro_trans: nro_trans,
                      id_registro: idRegistro,
                      id_accion:1,
                      id_seccion:33,
                      fecha:formattedDate,
                      descripcion:'Cambio de articulo y/o caravana',
                      cod_docum:'cmbArticulo',
                      observacion:  'Cambio de articulo y/o caravana',
                      id_empresa:articuloSeleccionado.id_empresa


                    }}); 
                          
                          
                    return {
          
                        nro_trans: nro_trans,
                        nro_lote:'0',
                        message:'Cambio de articulo realizado con exito'
                
                    }      




              }

    } catch (error) {
      console.error("Error:", error);
      return {
        error: true,
        message: "Error en la modificación del artículo"
      };
    }    
      // verifico que tenga stock
      // si tiene hago los cambios pertinentes
      // tabla de stock, cpf_costos
      //select * from cpt_recaravaneo


      //categorias_ganado
      //viene supuestamente la categoria nueva y la caravana. Se otiene el articulo anterior o nuevo y se lo baja y sube

      
 
            /////cpf_registro_sanitario


      
      
      

    }
    getAnimalesLoteSalida(empresa:number,nroTrans:number){


      return this.prisma.$transaction([
        this.prisma.$queryRaw`SELECT f.cod_articulo, a.nombre as nombre_articulo, f.nro_lote, f.cod_identidad, sum(f.cantidad*f.signo) cantidad, sum(f.cantidad2*f.signo) cantidad2, 
        sum(f.cantidad3*f.signo) cantidad3
        FROM cpf_stockaux f, articulos a where f.id_empresa=${empresa}
        AND f.estado='S' AND f.cod_articulo =a.cod_articulo AND f.nro_trans=${nroTrans}
            GROUP BY f.cod_articulo, f.nro_lote, f.cod_identidad, a.nombre HAVING sum(f.cantidad*f.signo)>0`,
     
      ])

    }

    getLotesSalida(empresa:number){

      return this.prisma.$queryRaw`SELECT t.nro_trans, t.nro_lote
      FROM public.cpt_movimiento_stock t
      WHERE t.id_empresa=${empresa}
      AND t.id_motivo_stk=2
	  AND NOT EXISTS (SELECT id FROM cpt_ingresoromaneo i WHERE i.nro_trans_ref = t.nro_trans AND i.estado='S' AND i.id_empresa=${empresa}  )
      order by t.nro_trans desc`;

    }




    async  getBultosDeEntradaACostear(trans:number, empresa:number): Promise<any> {

      const bultos = await this.prisma.$queryRaw`select p.* from cpp_movimiento_stock p, cpt_movimiento_stock t where p.nro_trans =t.nro_trans AND
      t.nro_trans=${trans} and t.id_empresa=${empresa} AND id_motivo_stk=1`;

      return bultos;


    }

    async getKilosTotLoteACostear(trans:number, empresa:number): Promise<any> {

      const kilos = await this.prisma.$queryRaw`select SUM(cantidad3) total from cpp_movimiento_stock p, cpt_movimiento_stock t where p.nro_trans =t.nro_trans AND
      t.nro_trans=${trans} and t.id_empresa=${empresa} AND id_motivo_stk=1`;

      return kilos;

    }


    getArticulosProv(prov:number, empresa:number){

      return this.prisma.$queryRaw`SELECT a.*, uni.descripcion unidad_compra, uniStk.descripcion unidad_stock, ti.descripcion descripcion_iva, ti.porcentaje, ti.id id_tasa_iva
      FROM articulos a, articulos_x_titular at, unidades uni, unidades uniStk, tasas_iva ti
      WHERE at.cod_articulo = a.cod_articulo
      AND a.id_unidad_cmp = uni.id
      AND a.id_unidad_stk = uniStk.id
      AND a.id_tasa_iva_cmp = ti.id
      AND a.estado='S'
      AND at.id_titular =${prov}
      AND a.id_empresa=${empresa}`;

    }
    

    async eliminoRomaneo(Id:number) {
      
     

      {
   
      const objeto =
        await this.prisma.cpt_ingresoRomaneo.findFirst({
          where: {
            id: Id,
            estado:'S'
          },
        });
  
      // check if user owns the bookmark
      if (!objeto )
        throw new ForbiddenException(
          'Access to resources denied',
        );
        console.log(this.model)
        //console.log(tabla);
        //console.log(Id);
      console.log(objeto)

      await this.prisma.cpt_ingresoRomaneo.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });

      await this.prisma.cpp_ingresoRomaneo.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });

  

      await this.prisma.cpf_log.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });    
    }



  }


    async eliminoFactProv(Id:number) {
      
     

      {
   
      const objeto =
        await this.prisma.cpt_fact_prov.findFirst({
          where: {
            id: Id,
            estado:'S'
          },
        });
  
      // check if user owns the bookmark
      if (!objeto )
        throw new ForbiddenException(
          'Access to resources denied',
        );
        console.log(this.model)
        //console.log(tabla);
        //console.log(Id);
      console.log(objeto)

      await this.prisma.cpt_fact_prov.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });

      await this.prisma.cpp_fact_prov.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });

      await this.prisma.cpf_stockaux.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });

      await this.prisma.cpf_contaux.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });      

      await this.prisma.cpf_costos.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });    

      await this.prisma.cpf_log.updateMany({
        where: {
          nro_trans: objeto.nro_trans,
        },
        data: {
          estado: 'N'
        },
      });    
    }



  }

  async  rollback(proceso:string,nroTrans:number) {

  
    switch (proceso){
  
  
      case 'ajuAltaStkGndInd':
    
      await this.prisma.cpt_identidad.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
      await this.prisma.cpt_altaganado.deleteMany({
        where: {
          nro_trans: nroTrans,
        },
      });
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



        case 'movimientoStk':
    


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

        await this.prisma.cpf_stockaux.deleteMany({
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
}
  
  function withoutProperty(obj, property) {  
        const { [property]: unused, ...rest } = obj

      return rest
    }

   