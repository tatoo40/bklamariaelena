import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
//import {CreateBookmarkDto,EditBookmarkDto} from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import {
  PrismaClient,
  Prisma,
} from '@prisma/client';
import { AccionMasivaLoteCabezal } from './dto/accionmasivalote.dto';
import { AccionMasivaLoteLineas } from './dto/accionmasivaloteLineas.dto';
import { AgregarCpfStockaux } from './dto/agregarcpfstockaux.dto';
import moment = require('moment');
import { GanadoService } from 'src/ganado/ganado.service';
import { Console } from 'console';
//import obtengoNroTrans from '../helpers/obtengo-nro-trans'

@Injectable()
export class AccionxloteService {
  constructor(
    private prisma: PrismaService,
    private ganadoService: GanadoService,
  ) {}
  public model: string = '';

  getGeneralById(id: number, tabla: string) {
    this.model = tabla;

    return this.prisma[this.model].findFirst({
      where: {
        id,
        estado: 'S',
      },
    });
  }

  getGeneral(tabla: string) {
    this.model = tabla;

    return this.prisma[this.model].findMany({
      where: {
        estado: 'S',
      },
    });
  }

  async accionxlote(accion: string, dto) {
    //console.log(dto.formData)
    let idRegistroSanitario = 0;
    let cabezal: any;
    let cabezalSanitario: any;
    let idRegistro: any;
    let dtoLineas: any;
    let lineas: any;
    let lineasCpfStockaux: any;
    let lineasSanitarias: any;
    let cpf_log: any;
    let error_proceso = false;
    let error_mensaje = '';

    let controlPaso;
    //dto=dto.formData;
    dto: AccionMasivaLoteCabezal;
    try {
      const nro_trans =
        await this.obtengoNroTrans();
      //console.log(dto)
      const format = 'YYYY-MM-DDT00:00:00.000Z';
      const myDate = dto.fecha;
      const formattedDate = moment(
        myDate,
        'DD/MM/YYYY',
      ).format(format);

      const formatLote = 'YYYYMMDD';
      const fechaLote = moment(
        myDate,
        'DD/MM/YYYY',
      ).format(formatLote);


        //console.log(formattedDate);

      switch (accion) {
        case 'cargainicialmasiva':



              console.log('aca antes de entrar a la carga masiva inicial')
              console.log(dto.lineas)
              controlPaso = await this.ganadoService.ctrlAnimalLoteYaProcesado(dto.lineas);
        
              if(controlPaso)
              {
              cabezal =
                await this.prisma.cpt_movimiento_stock.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      peso_total_real:
                        dto.peso_total_real,
                      peso_total_facturado:
                        dto.peso_total_facturado,
                      cantidad_ganado:
                        dto.cantidad_total,
                      fecha: formattedDate,
                      //serie_guia:dto.serie_guia,
                      //nro_guia:dto.nro_guia,
                      valor_dicose: dto.dicose,
                      id_propiedad_ganado:
                        dto.id_propiedad_ganado,
                      cod_articulo: dto.cod_articulo,
                      id_tipo_toma_peso:
                        dto.id_tipo_peso,
                      id_motivo_stk:
                        dto.id_motivo_mov_stk,
                      bania_garrapata:
                        dto.bania_garrapata,
                    },
                  },
                );

              idRegistro = cabezal.id;

              //como proceso las lineas?
              dtoLineas = dto.lineas;
              dtoLineas: AccionMasivaLoteLineas;

              //console.log(dtoLineas);
              dtoCpfStockaux: AgregarCpfStockaux;

              for (
                var i = 0;
                i < dtoLineas.length;
                ++i
              ) {
                let pesoPromedioUnidad:number = 0;
                let pesoPromedioUnidadFormateado:string = '0';
                let pesoIndividuo:number = 0;

                if(dto.peso_total_facturado!=0){

   
                  pesoPromedioUnidad =
                  (dtoLineas[i].peso *
                    dto.peso_total_facturado) /
                  dto.peso_total_real;
               
                  pesoPromedioUnidadFormateado = pesoPromedioUnidad.toFixed(2);


                  pesoIndividuo = dtoLineas[i].peso;

                }
      

                lineas =
                  await this.prisma.cpp_movimiento_stock.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: dto.cantidad,
                        cantidad2: pesoIndividuo,
                        cantidad3:pesoPromedioUnidadFormateado,
                        fecha: formattedDate,
                        nro_lote:dto.anexo_lote,
                        cod_identidad:
                          dtoLineas[i].EID,
                        id_empresa: dto.id_empresa,
                        cod_articulo:
                          dto.cod_articulo,
                      },
                    },
                  );

                lineasCpfStockaux =
                  await this.prisma.cpf_stockaux.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: dto.cantidad,
                        cantidad2: pesoIndividuo,
                        cantidad3: pesoPromedioUnidad,
                        signo: 1,
                        nro_lote: dto.anexo_lote,
                        cod_identidad:
                          dtoLineas[i].EID,
                        fecha: formattedDate,
                        id_motivo_stk:
                          dto.id_motivo_mov_stk,
                        cod_articulo:
                          dto.cod_articulo,
                        id_unidad_stk:
                          dto.id_unidad_stk,
                        id_empresa: dto.id_empresa,
                        id_estado_stock:
                          dto.id_estado_stock,
                          id_sector: dto.id_sector,
                      },
                    },
                  );


                  const obtengoSexoAnimales =  await this.ganadoService.obtengoSexoAnimales(dto.id_categoria_ganado, dto.id_raza_ganado); 
              

                  await this.prisma.cpt_identidad.create({
                    data: {

                      nro_lote: dto.anexo_lote,
                      cod_identidad: dtoLineas[i].EID,                 
                      cod_articulo: dto.cod_articulo,
                      meses:0,// VER COMO LO RESOLVEMOS
                      peso_inicial:pesoIndividuo,   
                      fecha_entrada:formattedDate, 
                      id_categoria_ganado:parseInt(dto.id_categoria_ganado, 10),
                      id_marca_ganado:parseInt(dto.id_raza_ganado, 10),
                      cruza:'',
                      dias:0, /// VER COMO LO RESOLVEMOS
                      documento_ingreso:dto.serie_guia+'-'+dto.nro_guia,
                      errores:'No',
                      fecha_ingreso:formattedDate,
                      fecha_identificacion:formattedDate,    
                      propietario:dto.dicose.toString(),
                      sexo:obtengoSexoAnimales.sexo,
                      ubicacion:dto.dicose.toString(),
                      tenedor:dto.dicose.toString(),
                      status_vida:'Vivo',
                      status_trazabilidad:'Trazado',
                      id_empresa:dto.id_empresa,




        
                    }}); 





              }

              //cpf_log
              cpf_log =
                await this.prisma.cpf_log.create({
                  data: {
                    nro_trans: nro_trans,
                    id_registro: idRegistro,
                    id_accion: 1,
                    id_seccion: 48,
                    fecha: formattedDate,
                    descripcion:
                      'Carga inicial de ganado masivo',
                    cod_docum: 'cargaIni',
                    observacion:
                      'Carga inicial de ganado masivo',
                      id_empresa:dto.id_empresa
                  },
                });
              return {
                nro_trans: nro_trans,
                nro_lote: dto.anexo_lote,
                message: 'Carga realizada con exito',
              };
            }else{

              //algun error atrapado


            }































        break;
        case 'compraganadomasiva':


          //Obtengo el nro de transaccion
            console.log('dasdasd');
          cabezal =
            await this.prisma.cpt_movimiento_stock.create(
              {
                data: {
                  nro_trans: nro_trans,
                  peso_total_real:
                    dto.peso_total_real,
                  peso_total_facturado:
                    dto.peso_total_facturado,
                  cantidad_ganado:
                    dto.cantidad_total,
                  fecha: formattedDate,
                  serie_guia: dto.serie_guia,
                  nro_guia: dto.nro_guia,
                  valor_dicose: dto.dicose,
                  id_propiedad_ganado:
                    dto.id_propiedad_ganado,
                  cod_articulo: dto.cod_articulo,
                  id_tipo_toma_peso:
                    dto.id_tipo_peso,
                  id_motivo_stk:
                    dto.id_motivo_mov_stk,
                  bania_garrapata:
                    dto.bania_garrapata,
                  nro_lote:
                    dto.anexo_lote,
                },
              },
            );

          idRegistro = cabezal.id;

          //si bania contra las garrapatas
          if (dto.bania_garrapata) {
            cabezalSanitario =
              await this.prisma.cpt_registro_sanitario.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    peso_total_real:
                      dto.peso_total_real,
                    peso_total_facturado:
                      dto.peso_total_facturado,
                    cantidad_ganado:
                      dto.cantidad_total,
                    fecha: formattedDate,
                    en_alta: dto.bania_garrapata,
                    id_motivo_sanitario: 1,
                    id_empresa: dto.id_empresa,
                  },
                },
              );


              //obtengo articulo del motivo sanitario
              const insumoPromise = this.obtengoInsumo(1, dto.id_empresa);
              // tengo que evaluar la dosificacion por animal
        
              const insumo: any = await insumoPromise;
              console.log("Fetched insumo:", insumo);
              //insumo = insumo[0];
              //console.log(insumo.cod_articulo);
              if (insumo.cod_articulo !=='') {
                //agrego en cpf_consumos
                const cantidadConsumida = dto.cantidad_total* insumo.dosis;
                //console.log('aca')
                //console.log(cantidadConsumida);
                
                if (cantidadConsumida>insumo.cantidad_stk){
                  // tengo que cortar porque no hay stock del insumo
                  error_proceso = true;
                  error_mensaje += 'Esta queriendo consumir mas cantidad del articulo '+insumo.nombre+' que la que existe en stock:'+insumo.cantidad_stk+' '+insumo.descripcion_corta+'<br>';
                  rollback('compraganadomasiva',nro_trans);
                  return{
                    error_proceso:true,
                    message: error_mensaje,
                  }
                }
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
                      id_motivo_stk: dto.id_motivo_mov_stk,
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
                      id_motivo_stk:dto.id_motivo_mov_stk,
                      cod_articulo:insumo.cod_articulo,
                      id_unidad_stk:insumo.id_unidad_stk,
                      id_empresa: dto.id_empresa,
                      id_estado_stock:1,
                      id_sector: 7,
                    },
                  },
                );



              }

            idRegistroSanitario = cabezalSanitario.id;
          }



          if (dto.carbunco) {
            cabezalSanitario =
              await this.prisma.cpt_registro_sanitario.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    peso_total_real:
                      dto.peso_total_real,
                    peso_total_facturado:
                      dto.peso_total_facturado,
                    cantidad_ganado:
                      dto.cantidad_total,
                    fecha: formattedDate,
                    en_alta: dto.bania_garrapata,
                    id_motivo_sanitario: 2,
                    id_empresa: dto.id_empresa,
                  },
                },
              );

              //obtengo articulo del motivo sanitario
              const insumo:any = await this.obtengoInsumo(2, dto.id_empresa);
              // tengo que evaluar la dosificacion por animal

              if(insumo.cod_articulo !==''){
                //agrego en cpf_consumos
                const cantidadConsumida = dto.cantidad_total* insumo.dosis;

                if (cantidadConsumida>insumo.cantidad_stk){
                  // tengo que cortar porque no hay stock del insumo
                  error_proceso = true;
                  error_mensaje += 'Esta queriendo consumir mas cantidad del articulo '+insumo.nombre+' que la que existe en stock:'+insumo.cantidad_stk+' '+insumo.descripcion_corta+'<br>';
                  rollback('compraganadomasiva',nro_trans);
                  return{
                    error_proceso:true,
                    message: error_mensaje,
                  }
                }
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
                      id_motivo_stk: dto.id_motivo_mov_stk,
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
                      id_motivo_stk:dto.id_motivo_mov_stk,
                      cod_articulo:insumo.cod_articulo,
                      id_unidad_stk:insumo.id_unidad_stk,
                      id_empresa: dto.id_empresa,
                      id_estado_stock:1,
                      id_sector: 7,
                    },
                  },
                );



              }
     
            idRegistroSanitario = cabezalSanitario.id;
          }


          if (dto.clostridiosis) {
            cabezalSanitario =
              await this.prisma.cpt_registro_sanitario.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    peso_total_real:
                      dto.peso_total_real,
                    peso_total_facturado:
                      dto.peso_total_facturado,
                    cantidad_ganado:
                      dto.cantidad_total,
                    fecha: formattedDate,
                    en_alta: dto.bania_garrapata,
                    id_motivo_sanitario: 3,
                    id_empresa: dto.id_empresa,
                  },
                },
              );


              //obtengo articulo del motivo sanitario
              const insumo:any = await this.obtengoInsumo(3 , dto.id_empresa);
              // tengo que evaluar la dosificacion por animal

              if(insumo.cod_articulo !==''){
                //agrego en cpf_consumos
                const cantidadConsumida = dto.cantidad_total* insumo.dosis;

                if (cantidadConsumida>insumo.cantidad_stk){
                  // tengo que cortar porque no hay stock del insumo
                  error_proceso = true;
                  error_mensaje += 'Esta queriendo consumir mas cantidad del articulo '+insumo.nombre+' que la que existe en stock:'+insumo.cantidad_stk+' '+insumo.descripcion_corta+'<br>';
                  rollback('compraganadomasiva',nro_trans);
                  return{
                    error_proceso:true,
                    message: error_mensaje,
                  }
                }
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
                      id_motivo_stk: dto.id_motivo_mov_stk,
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
                      id_motivo_stk:dto.id_motivo_mov_stk,
                      cod_articulo:insumo.cod_articulo,
                      id_unidad_stk:insumo.id_unidad_stk,
                      id_empresa: dto.id_empresa,
                      id_estado_stock:1,
                      id_sector: 7,
                    },
                  },
                );



              }






            idRegistroSanitario =
              cabezalSanitario.id;
          }

          if (dto.parasitos_internos) {
            cabezalSanitario =
              await this.prisma.cpt_registro_sanitario.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    peso_total_real:
                      dto.peso_total_real,
                    peso_total_facturado:
                      dto.peso_total_facturado,
                    cantidad_ganado:
                      dto.cantidad_total,
                    fecha: formattedDate,
                    en_alta: dto.bania_garrapata,
                    id_motivo_sanitario: 4,
                    id_empresa: dto.id_empresa,
                  },
                },
              );

              //obtengo articulo del motivo sanitario
              const insumo:any = await this.obtengoInsumo(4, dto.id_empresa);
              // tengo que evaluar la dosificacion por animal

              if(insumo.cod_articulo !==''){
                //agrego en cpf_consumos
                const cantidadConsumida = dto.cantidad_total* insumo.dosis;

                if (cantidadConsumida>insumo.cantidad_stk){
                  // tengo que cortar porque no hay stock del insumo
                  error_proceso = true;
                  error_mensaje += 'Esta queriendo consumir mas cantidad del articulo '+insumo.nombre+' que la que existe en stock:'+insumo.cantidad_stk+' '+insumo.descripcion_corta+'<br>';
                  rollback('compraganadomasiva',nro_trans);
                  return{
                    error_proceso:true,
                    message: error_mensaje,
                  }
                }
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
                      id_motivo_stk: dto.id_motivo_mov_stk,
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
                      id_motivo_stk:dto.id_motivo_mov_stk,
                      cod_articulo:insumo.cod_articulo,
                      id_unidad_stk:insumo.id_unidad_stk,
                      id_empresa: dto.id_empresa,
                      id_estado_stock:1,
                      id_sector: 7,
                    },
                  },
                );



              }


            idRegistroSanitario =
              cabezalSanitario.id;
          }
          //como proceso las lineas?
          dtoLineas = dto.lineas;
          dtoLineas: AccionMasivaLoteLineas;

          //console.log(dtoLineas);
          dtoCpfStockaux: AgregarCpfStockaux;

          //console.log(dto)

          const obtengoSexoAnimales =  await this.ganadoService.obtengoSexoAnimales(dto.id_categoria_ganado, dto.id_raza_ganado); 
          


          for (
            var i = 0;
            i < dtoLineas.length;
            ++i
          ) {

            //console.log(dto)
            //console.log(dtoLineas)
            var pesoIndividuo:number=0;

            if (isNaN(dtoLineas[i].peso) || dtoLineas[i].peso === 0) {
                // Calcular pesoPromedioUnidad utilizando dto.peso_total_facturado / dto.cantidad
                pesoIndividuo = parseFloat(dto.peso_total_facturado) / dto.cantidad_total;
                var pesoPromedioUnidad = pesoIndividuo;
            } else {
                // Calcular pesoPromedioUnidad utilizando (dtoLineas[i].peso * dto.peso_total_facturado) / dto.peso_total_real
                pesoIndividuo=parseFloat(dtoLineas[i].peso);
                var pesoPromedioUnidad = (dtoLineas[i].peso * dto.peso_total_facturado) / dto.peso_total_real;
            }
          
            var cantidad2 = pesoIndividuo.toFixed(2);
            var pesoPromedioUnidadFormateado = pesoPromedioUnidad.toFixed(2);


           

            lineas =
              await this.prisma.cpp_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad: dto.cantidad,
                    cantidad2:cantidad2,
                    cantidad3:
                      pesoPromedioUnidadFormateado,
                    fecha: formattedDate,
                    nro_lote:dto.anexo_lote,
                    cod_identidad:
                      dtoLineas[i].EID,
                    id_empresa: dto.id_empresa,
                    cod_articulo:
                      dto.cod_articulo,
                  },
                },
              );

            lineasCpfStockaux =
              await this.prisma.cpf_stockaux.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad: dto.cantidad,
                    cantidad2:cantidad2,
                    cantidad3: pesoPromedioUnidad,
                    signo: 1,
                    nro_lote: dto.anexo_lote,
                    cod_identidad:
                      dtoLineas[i].EID,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
                    cod_articulo:
                      dto.cod_articulo,
                    id_unidad_stk:dto.id_unidad_stk,
                    id_empresa: dto.id_empresa,
                    id_estado_stock:
                    dto.id_estado_stock,
                    id_sector: dto.id_sector,
                  },
                },
              );

           // console.log(dto)

            //console.log(dtoLineas)

       



              await this.prisma.cpt_identidad.create({
                data: {
  
                  nro_lote:
                  dto.anexo_lote,
                  cod_identidad: dtoLineas[i].EID,                 
                  cod_articulo:dto.cod_articulo,  
                  dias:0,
                  meses:0,
                  propietario:dto.dicose.toString(),
                  ubicacion:dto.dicose.toString(),
                  tenedor:dto.dicose.toString(),
                  status_vida:'Vivo',
                  status_trazabilidad:'Trazado',
                  errores:'No',
                  sexo:obtengoSexoAnimales.sexo,
                  cruza:'',
                  //id_empresa:dto.id_empresa,
                  fecha_ingreso:formattedDate,
                  documento_ingreso:dto.serie_guia+'-'+dto.nro_guia,
                  fecha_identificacion:formattedDate,    
                  peso_inicial:cantidad2,                  
                  fecha_entrada:formattedDate, 
                  nro_trans:nro_trans,
                  id_empresa:dto.id_empresa,
                  id_categoria_ganado:parseInt(dto.id_categoria_ganado,10),
                  id_marca_ganado:parseInt(dto.id_raza_ganado,10)
                  //id_categoria_ganado:dto.id_categoria_ganado,
                  //id_marca_ganado:parseInt(dto.id_raza_ganado,10), 
  
    
                }}); 





            if (dto.bania_garrapata) {
              lineasSanitarias =
                await this.prisma.cpp_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      nro_lote:dto.anexo_lote,
                      cod_identidad: 
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 1,
                    },
                  },
                );

                await this.prisma.cpf_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      signo:1,
                      nro_lote: dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 1,
                    },
                  },
                );


                const insumo:any = await this.obtengoInsumo(1, dto.id_empresa);
                //le asigno el valor al bicho por este remedio
                  //console.log(insumo.cod_articulo);
                if (insumo.cod_articulo!==''){
                    await this.prisma.cpf_costos.create({
                      data: {

                    
                        nro_trans:nro_trans,
                        importe_mo:(insumo.precio_unitario_tr/insumo.cantidad_compra) * insumo.dosis,
                        importe_mn:(insumo.precio_unitario_mn/insumo.cantidad_compra)  * insumo.dosis,
                        importe_tr:(insumo.precio_unitario_tr/insumo.cantidad_compra)  * insumo.dosis,
                        tc:insumo.tc,
                        signo:1,
                        nro_lote:
                        dto.anexo_lote,
                        cod_identidad:dtoLineas[i].EID,
                        fecha:formattedDate,
                        nro_trans_ref:nro_trans,
                        id_empresa: dto.id_empresa,
                        cod_articulo:dto.cod_articulo,
                        id_unidad_stk:1,
                        id_tipo_costo:1
                        

                      }});
                }


            }


            if (dto.parasitos_internos) {
              lineasSanitarias =
                await this.prisma.cpp_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      nro_lote:
                        dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 4,
                    },
                  },
                );

                await this.prisma.cpf_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      signo:1,
                      nro_lote:
                        dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 1,
                    },
                  },
                );

                const insumo:any = await this.obtengoInsumo(4, dto.id_empresa);
                //le asigno el valor al bicho por este remedio
                if (insumo.cod_articulo!==''){
                await this.prisma.cpf_costos.create({
                  data: {

                
                    nro_trans:nro_trans,
                    importe_mo:(insumo.precio_unitario_tr/insumo.cantidad_compra) * insumo.dosis,
                    importe_mn:(insumo.precio_unitario_mn/insumo.cantidad_compra)  * insumo.dosis,
                    importe_tr:(insumo.precio_unitario_tr/insumo.cantidad_compra)  * insumo.dosis,
                    tc:insumo.tc,
                    signo:1,
                    nro_lote:dto.anexo_lote,
                    cod_identidad:dtoLineas[i].EID,
                    fecha:formattedDate,
                    nro_trans_ref:nro_trans,
                    id_empresa: dto.id_empresa,
                    cod_articulo:dto.cod_articulo,
                    id_unidad_stk:1,
                    id_tipo_costo:1
                    

                  }});
                }




            }


            if (dto.carbunco) {
              lineasSanitarias =
                await this.prisma.cpp_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      nro_lote:dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 2,
                    },
                  },
                );

                await this.prisma.cpf_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      signo:1,
                      nro_lote:dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 1,
                    },
                  },
                );

                const insumo:any = await this.obtengoInsumo(2, dto.id_empresa);
                //le asigno el valor al bicho por este remedio
                if (insumo.cod_articulo!==''){
                await this.prisma.cpf_costos.create({
                  data: {

                
                    nro_trans:nro_trans,
                    importe_mo:(insumo.precio_unitario_tr/insumo.cantidad_compra) * insumo.dosis,
                    importe_mn:(insumo.precio_unitario_mn/insumo.cantidad_compra)  * insumo.dosis,
                    importe_tr:(insumo.precio_unitario_tr/insumo.cantidad_compra)  * insumo.dosis,
                    tc:insumo.tc,
                    signo:1,
                    nro_lote:dto.anexo_lote,
                    cod_identidad:dtoLineas[i].EID,
                    fecha:formattedDate,
                    nro_trans_ref:nro_trans,
                    id_empresa: dto.id_empresa,
                    cod_articulo:dto.cod_articulo,
                    id_unidad_stk:1,
                    id_tipo_costo:1
                    

                  }});
                }


            }


            if (dto.clostridiosis) {
              lineasSanitarias =
                await this.prisma.cpp_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      nro_lote: dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 3,
                    },
                  },
                );

                await this.prisma.cpf_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: dto.cantidad,
                      cantidad2:cantidad2,
                      cantidad3:
                        pesoPromedioUnidad,
                      fecha: formattedDate,
                      signo:1,
                      nro_lote:dto.anexo_lote,
                      cod_identidad:
                        dtoLineas[i].EID,
                      id_empresa: dto.id_empresa,
                      cod_articulo:
                        dto.cod_articulo,
                      id_padre:
                        idRegistroSanitario,
                      id_motivo_sanitario: 1,
                    },
                  },
                );


                const insumo:any = await this.obtengoInsumo(3, dto.id_empresa);
                //le asigno el valor al bicho por este remedio
                if (insumo.cod_articulo!==''){
                await this.prisma.cpf_costos.create({
                  data: {

                
                    nro_trans:nro_trans,
                    importe_mo:(insumo.precio_unitario_tr/insumo.cantidad_compra) * insumo.dosis,
                    importe_mn:(insumo.precio_unitario_mn/insumo.cantidad_compra)  * insumo.dosis,
                    importe_tr:(insumo.precio_unitario_tr/insumo.cantidad_compra)  * insumo.dosis,
                    tc:insumo.tc,
                    signo:1,
                    nro_lote:dto.anexo_lote,
                    cod_identidad:dtoLineas[i].EID,
                    fecha:formattedDate,
                    nro_trans_ref:nro_trans,
                    id_empresa: dto.id_empresa,
                    cod_articulo:dto.cod_articulo,
                    id_unidad_stk:1,
                    id_tipo_costo:1
                    

                  }});
                }


            }



          }

   
          cpf_log =
            await this.prisma.cpf_log.create({
              data: {
                nro_trans: nro_trans,
                id_registro: idRegistro,
                id_accion: 1,
                id_seccion: 48,
                fecha: formattedDate,
                descripcion: 'Compra ganado',
                cod_docum: 'altaCmpMasivaConBano',
                observacion: dto.bania_garrapata
                  ? 'Alta masiva de ganado por compra con bano'
                  : 'Alta masiva de ganado por compra sin bano',
                  id_empresa:dto.id_empresa
              },
            });

          
            if (error_proceso){
              return{
                error_proceso:true,
                message: error_mensaje,
              }
            }
            return {
            error_proceso:false,
            nro_trans: nro_trans,
            nro_lote:dto.anexo_lote,
              message: 'Carga realizada con exito',
          };
          break;






        case 'ajumenganadomasiva':
          cabezal =
            await this.prisma.cpt_movimiento_stock.create(
              {
                data: {
                  nro_trans: nro_trans,
                  peso_total_real:
                    dto.peso_total_real,
                  peso_total_facturado:
                    dto.peso_total_facturado,
                  cantidad_ganado:
                    dto.cantidad_total,
                  fecha: formattedDate,
                  //serie_guia:dto.serie_guia,
                  //nro_guia:dto.nro_guia,
                  valor_dicose: dto.dicose,
                  id_propiedad_ganado:
                    dto.id_propiedad_ganado,
                  cod_articulo: dto.cod_articulo,
                  id_tipo_toma_peso:
                    dto.id_tipo_peso,
                  id_motivo_stk:
                    dto.id_motivo_mov_stk,
                  bania_garrapata:
                    dto.bania_garrapata,
                  observaciones:
                    dto.observaciones,
                },
              },
            );

          idRegistro = cabezal.id;

          //como proceso las lineas?
          dtoLineas = dto.lineas;
          dtoLineas: AccionMasivaLoteLineas;

          //console.log(dtoLineas);
          dtoCpfStockaux: AgregarCpfStockaux;

          for (
            var i = 0;
            i < dtoLineas.length;
            ++i
          ) {
            //obtengo de cada animal los datos para dar de baja
            var animalAProcesarString: any =
              await this.ganadoService.getGanadoById(
                dtoLineas[i].caravana,
              );

            var animalAProcesar =
              animalAProcesarString[0][0];


            lineas =
              await this.prisma.cpp_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad:
                      animalAProcesar.cantidad,
                    cantidad2:
                      animalAProcesar.cantidad2,
                    cantidad3:
                      animalAProcesar.cantidad3,
                    fecha: formattedDate,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
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
                    signo: -1,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
                    id_unidad_stk:
                      dto.id_unidad_stk,
                    id_empresa: dto.id_empresa,
                    id_estado_stock:
                      dto.id_estado_stock,
                      id_sector: dto.id_sector,
                  },
                },
              );
          }

          //cpf_log
          cpf_log =
            await this.prisma.cpf_log.create({
              data: {
                nro_trans: nro_trans,
                id_registro: idRegistro,
                id_accion: 1,
                id_seccion: 48,
                fecha: formattedDate,
                descripcion:
                  'Ajuste de stock ganado a la baja',
                cod_docum: 'ajusteBajaStockGnd',
                observacion:
                  'Baja masiva por ajuste stock',
                  id_empresa:dto.id_empresa
              },
            });
          return {
            nro_trans: nro_trans,
            message: 'Baja realizada con exito',
          };

          break;

        case 'ajumasganadomasiva':

          
          //ANTES QUE NADA CONTROLO NUEVAMENTE QUE NINGUA DE LAS CARAVANAS PROCESADAS YA HAYA SIDO 
          //DADA DE ALTA
          //let controlPaso = false;

          console.log('aca antes de entrar')
          console.log(dto.lineas)
          controlPaso = await this.ganadoService.ctrlAnimalLoteYaProcesado(dto.lineas);
    
          if(controlPaso)
          {
          cabezal =
            await this.prisma.cpt_movimiento_stock.create(
              {
                data: {
                  nro_trans: nro_trans,
                  peso_total_real:
                    dto.peso_total_real,
                  peso_total_facturado:
                    dto.peso_total_facturado,
                  cantidad_ganado:
                    dto.cantidad_total,
                  fecha: formattedDate,
                  //serie_guia:dto.serie_guia,
                  //nro_guia:dto.nro_guia,
                  valor_dicose: dto.dicose,
                  id_propiedad_ganado:
                    dto.id_propiedad_ganado,
                  cod_articulo: dto.cod_articulo,
                  id_tipo_toma_peso:
                    dto.id_tipo_peso,
                  id_motivo_stk:
                    dto.id_motivo_mov_stk,
                  bania_garrapata:
                    dto.bania_garrapata,
                },
              },
            );

          idRegistro = cabezal.id;

          //como proceso las lineas?
          dtoLineas = dto.lineas;
          dtoLineas: AccionMasivaLoteLineas;

          //console.log(dtoLineas);
          dtoCpfStockaux: AgregarCpfStockaux;

          for (
            var i = 0;
            i < dtoLineas.length;
            ++i
          ) {
            var pesoPromedioUnidad =
              (dtoLineas[i].peso *
                dto.peso_total_facturado) /
              dto.peso_total_real;
            var pesoPromedioUnidadFormateado =
              pesoPromedioUnidad.toFixed(2);

            lineas =
              await this.prisma.cpp_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad: dto.cantidad,
                    cantidad2: dtoLineas[i].peso,
                    cantidad3:
                      pesoPromedioUnidadFormateado,
                    fecha: formattedDate,
                    nro_lote:
                      'LOT-' +
                      fechaLote +
                      '-' +
                      nro_trans +
                      '-' +
                      dto.anexo_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    id_empresa: dto.id_empresa,
                    cod_articulo:
                      dto.cod_articulo,
                  },
                },
              );

            lineasCpfStockaux =
              await this.prisma.cpf_stockaux.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad: dto.cantidad,
                    cantidad2: dtoLineas[i].peso,
                    cantidad3: pesoPromedioUnidad,
                    signo: 1,
                    nro_lote:
                      'LOT-' +
                      fechaLote +
                      '-' +
                      nro_trans +
                      '-' +
                      dto.anexo_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
                    cod_articulo:
                      dto.cod_articulo,
                    id_unidad_stk:
                      dto.id_unidad_stk,
                    id_empresa: dto.id_empresa,
                    id_estado_stock:
                      dto.id_estado_stock,
                      id_sector: dto.id_sector,
                  },
                },
              );


              const obtengoSexoAnimales =  await this.ganadoService.obtengoSexoAnimales(dto.id_categoria_ganado, dto.id_raza_ganado); 
          

              await this.prisma.cpt_identidad.create({
                data: {
  
                  nro_lote:
                  'LOT-' +
                  fechaLote +
                  '-' +
                  nro_trans +
                  '-' +
                  dto.anexo_lote,
                  cod_identidad: dtoLineas[i].caravana,                 
                  cod_articulo: dto.cod_articulo,
                  meses:0,// VER COMO LO RESOLVEMOS
                  peso_inicial:dtoLineas[i].peso,   
                  fecha_entrada:formattedDate, 
                  id_categoria_ganado:parseInt(dto.id_categoria_ganado, 10),
                  id_marca_ganado:parseInt(dto.id_raza_ganado, 10),
                  cruza:'',
                  dias:0, /// VER COMO LO RESOLVEMOS
                  documento_ingreso:dto.serie_guia+'-'+dto.nro_guia,
                  errores:'No',
                  fecha_ingreso:formattedDate,
                  fecha_identificacion:formattedDate,    
                  propietario:dto.dicose.toString(),
                  sexo:obtengoSexoAnimales.sexo,
                  ubicacion:dto.dicose.toString(),
                  tenedor:dto.dicose.toString(),
                  status_vida:'Vivo',
                  status_trazabilidad:'Trazado',
                  id_empresa:dto.id_empresa,


 

    
                }}); 





          }

          //cpf_log
          cpf_log =
            await this.prisma.cpf_log.create({
              data: {
                nro_trans: nro_trans,
                id_registro: idRegistro,
                id_accion: 1,
                id_seccion: 48,
                fecha: formattedDate,
                descripcion:
                  'Ajuste de stock ganado',
                cod_docum: 'ajusteAltaStockGnd',
                observacion:
                  'Alta masiva por ajuste stock',
                  id_empresa:dto.id_empresa
              },
            });
          return {
            nro_trans: nro_trans,
            nro_lote:
              'LOT-' +
              fechaLote +
              '-' +
              nro_trans +
              '-' +
              dto.anexo_lote,
            message: 'Carga realizada con exito',
          };
        }else{

          //algun error atrapado


        }
          break;

        case 'movimientoStk':
          //obtongo las carvanas qe voy a dar de baja en el deposito donde estan y los  subo en el nuevo deposito

          cabezal =
            await this.prisma.cpt_movimiento_stock.create(
              {
                data: {
                  nro_trans: nro_trans,
                  peso_total_real: 0,
                  peso_total_facturado: 0,
                  cantidad_ganado: 0,
                  fecha: formattedDate,
                  //serie_guia:dto.serie_guia,
                  //nro_guia:dto.nro_guia,
                  valor_dicose: 0,
                  id_propiedad_ganado: 1,
                  cod_articulo: 'NOASIG',
                  id_tipo_toma_peso: 1,
                  id_motivo_stk:
                    dto.id_motivo_mov_stk,
                },
              },
            );

          idRegistro = cabezal.id;

          //como proceso las lineas?
          dtoLineas = dto.lineas;
          dtoLineas: AccionMasivaLoteLineas;

          //console.log(dtoLineas);
          dtoCpfStockaux: AgregarCpfStockaux;

          for (
            var i = 0;
            i < dtoLineas.length;
            ++i
          ) {
            //obtengo de cada animal los datos para dar de baja
            var animalAProcesarString: any =
              await this.ganadoService.getGanadoById(
                dtoLineas[i].caravana,
              );

            var animalAProcesar =
              animalAProcesarString[0][0];

            console.log(animalAProcesar);

            lineas =
              await this.prisma.cpp_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad:
                      animalAProcesar.cantidad,
                    cantidad2:
                      animalAProcesar.cantidad2,
                    cantidad3:
                      animalAProcesar.cantidad3,
                    fecha: formattedDate,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
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
                    signo: -1,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                    animalAProcesar.id_motivo_stk,
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
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
                    id_unidad_stk:
                      animalAProcesar.id_unidad_stk,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    id_estado_stock:
                      animalAProcesar.id_estado_stock,
                      id_sector:
                      dto.id_sector_destino,
                  },
                },
              );
          }

          //cpf_log
          cpf_log =
            await this.prisma.cpf_log.create({
              data: {
                nro_trans: nro_trans,
                id_registro: idRegistro,
                id_accion: 1,
                id_seccion: 48,
                fecha: formattedDate,
                descripcion:
                  'Movimiento de ganado',
                cod_docum: 'movimientoStk',
                observacion:
                  'Movimiento de ganado masivo',
                  id_empresa:dto.id_empresa
              },
            });
          return {
            nro_trans: nro_trans,
            message:
              'Movimiento realizada con exito',
          };

          break;





          case 'vtaganadomasiva':
            //obtongo las carvanas qe voy a dar de baja en el deposito donde estan y los  subo en el nuevo deposito
  
            cabezal =
              await this.prisma.cpt_movimiento_stock.create(
                {
                  data: {
            




                      nro_trans: nro_trans,
                      peso_total_real:
                        dto.peso_total_real,
                      peso_total_facturado:
                        dto.peso_total_facturado,
                      cantidad_ganado:
                        dto.cantidad_total,
                      fecha: formattedDate,
                      serie_guia: dto.serie_guia,
                      nro_guia: dto.nro_guia,
                      valor_dicose: dto.dicose,
                      id_propiedad_ganado: 1,
                      cod_articulo: 'NOASIG',
                      id_tipo_toma_peso: 0,
                      id_motivo_stk:
                        dto.id_motivo_mov_stk,
                      observaciones:
                        dto.observaciones,
                      bania_garrapata:false,
                      nro_lote:
                        'LOTSAL-' +
                        fechaLote +
                        '-' +
                        nro_trans +
                        '-1',






                  },
                },
              );
  
            idRegistro = cabezal.id;
  
            //como proceso las lineas?
            dtoLineas = dto.lineas;
            dtoLineas: AccionMasivaLoteLineas;
  
            //console.log(dtoLineas);
            dtoCpfStockaux: AgregarCpfStockaux;
  
            for (
              var i = 0;
              i < dtoLineas.length;
              ++i
            ) {
              //obtengo de cada animal los datos para dar de baja
              var animalAProcesarString: any =
                await this.ganadoService.getGanadoById(
                  dtoLineas[i].caravana,
                );
  
              var animalAProcesar =
                animalAProcesarString[0][0];
  
              //console.log(animalAProcesar);
  
              lineas =
                await this.prisma.cpp_movimiento_stock.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad:
                        animalAProcesar.cantidad,
                      cantidad2:dtoLineas[i].peso,
                      cantidad3:dtoLineas[i].peso,
                      fecha: formattedDate,
                      nro_lote:
                        'LOTSAL-' +
                        fechaLote +
                        '-' +
                        nro_trans +
                        '-1',
                      cod_identidad:
                        dtoLineas[i].caravana,
                      id_empresa:
                        animalAProcesar.id_empresa,
                      cod_articulo:
                        animalAProcesar.cod_articulo,
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
                      signo: -1,
                      nro_lote:
                        animalAProcesar.nro_lote,
                      cod_identidad:
                        dtoLineas[i].caravana,
                      fecha: formattedDate,
                      id_motivo_stk:
                        dto.id_motivo_mov_stk,
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
                      cantidad:animalAProcesar.cantidad,
                        cantidad2:dtoLineas[i].peso,
                        cantidad3:dtoLineas[i].peso,
                      signo: 1,
                      nro_lote:
                        'LOTSAL-' +
                        fechaLote +
                        '-' +
                        nro_trans +
                        '-1',
                      cod_identidad:
                        dtoLineas[i].caravana,
                      fecha: formattedDate,
                      id_motivo_stk:
                        dto.id_motivo_mov_stk,
                      cod_articulo:
                        animalAProcesar.cod_articulo,
                      id_unidad_stk:
                        animalAProcesar.id_unidad_stk,
                      id_empresa:
                        animalAProcesar.id_empresa,
                      id_estado_stock: 3,
                      id_sector:
                        animalAProcesar.id_sector,
                    },
                  },
                );
            }
  
            //cpf_log
            cpf_log =
              await this.prisma.cpf_log.create({
                data: {
                  nro_trans: nro_trans,
                  id_registro: idRegistro,
                  id_accion: 1,
                  id_seccion: 48,
                  fecha: formattedDate,
                  descripcion: 'Venta de ganado',
                  cod_docum: 'vtaGanado',
                  observacion: 'Venta de ganado',
                  id_empresa:dto.id_empresa
                },
              });
            return {
              nro_trans: nro_trans,
              nro_lote:
              'LOTSAL-' +
              fechaLote +
              '-' +
              nro_trans +
              '-1',
              message:
                'Venta realizada con exito',
            };
  
            break;











        case 'muerte':
          //obtongo las carvanas qe voy a dar de baja en el deposito donde estan y los  subo en el nuevo deposito

          cabezal =
            await this.prisma.cpt_movimiento_stock.create(
              {
                data: {
                  nro_trans: nro_trans,
                  peso_total_real: 0,
                  peso_total_facturado: 0,
                  cantidad_ganado: 0,
                  fecha: formattedDate,
                  //serie_guia:dto.serie_guia,
                  //nro_guia:dto.nro_guia,
                  valor_dicose: 0,
                  id_propiedad_ganado: 1,
                  cod_articulo: 'NOASIG',
                  id_tipo_toma_peso: 0,
                  id_motivo_stk:
                    dto.id_motivo_mov_stk,
                  observaciones:
                    dto.observaciones,
                },
              },
            );

          idRegistro = cabezal.id;

          //como proceso las lineas?
          dtoLineas = dto.lineas;
          dtoLineas: AccionMasivaLoteLineas;

          //console.log(dtoLineas);
          dtoCpfStockaux: AgregarCpfStockaux;

          for (
            var i = 0;
            i < dtoLineas.length;
            ++i
          ) {
            //obtengo de cada animal los datos para dar de baja
            var animalAProcesarString: any =
              await this.ganadoService.getGanadoById(
                dtoLineas[i].caravana,
              );

            var animalAProcesar =
              animalAProcesarString[0][0];

            //console.log(animalAProcesar);

            lineas =
              await this.prisma.cpp_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad:
                      animalAProcesar.cantidad,
                    cantidad2:
                      animalAProcesar.cantidad2,
                    cantidad3:
                      animalAProcesar.cantidad3,
                    fecha: formattedDate,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
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
                    signo: -1,
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
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
                    nro_lote:
                      animalAProcesar.nro_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
                    cod_articulo:
                      animalAProcesar.cod_articulo,
                    id_unidad_stk:
                      animalAProcesar.id_unidad_stk,
                    id_empresa:
                      animalAProcesar.id_empresa,
                    id_estado_stock: 2,
                    id_sector:
                      animalAProcesar.id_sector,
                  },
                },
              );
          }

          //cpf_log
          cpf_log =
            await this.prisma.cpf_log.create({
              data: {
                nro_trans: nro_trans,
                id_registro: idRegistro,
                id_accion: 1,
                id_seccion: 48,
                fecha: formattedDate,
                descripcion: 'Muerte de ganado',
                cod_docum: 'muerteGanado',
                observacion: 'Muerte de ganado',
                id_empresa:dto.id_empresa
              },
            });
          return {
            nro_trans: nro_trans,
            message:
              'Movimiento realizada con exito',
          };

          break;

        case 'nacganadomasiva':



        console.log('aca antes de entrar en nacimineto')
        console.log(dto.lineas)
        
        controlPaso = await this.ganadoService.ctrlAnimalLoteYaProcesado(dto.lineas);
  
        if(controlPaso)
        {

          cabezal =
            await this.prisma.cpt_movimiento_stock.create(
              {
                data: {
                  nro_trans: nro_trans,
                  peso_total_real:
                    dto.peso_total_real,
                  peso_total_facturado:
                    dto.peso_total_facturado,
                  cantidad_ganado:
                    dto.cantidad_total,
                  fecha: formattedDate,
                  //serie_guia:dto.serie_guia,
                  //nro_guia:dto.nro_guia,
                  valor_dicose: dto.dicose,
                  id_propiedad_ganado:
                    dto.id_propiedad_ganado,
                  cod_articulo: dto.cod_articulo,
                  id_tipo_toma_peso:
                    dto.id_tipo_peso,
                  id_motivo_stk:
                    dto.id_motivo_mov_stk,
                  bania_garrapata:
                    dto.bania_garrapata,
                },
              },
            );

          idRegistro = cabezal.id;

          //como proceso las lineas?
          dtoLineas = dto.lineas;
          dtoLineas: AccionMasivaLoteLineas;

          //console.log(dtoLineas);
          dtoCpfStockaux: AgregarCpfStockaux;

          for (
            var i = 0;
            i < dtoLineas.length;
            ++i
          ) {
            var pesoPromedioUnidad =
              (dtoLineas[i].peso *
                dto.peso_total_facturado) /
              dto.peso_total_real;
            var pesoPromedioUnidadFormateado =
              pesoPromedioUnidad.toFixed(2);

            lineas =
              await this.prisma.cpp_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad: dto.cantidad,
                    cantidad2: dtoLineas[i].peso,
                    cantidad3:
                      pesoPromedioUnidadFormateado,
                    fecha: formattedDate,
                    nro_lote:
                      'LOT-' +
                      fechaLote +
                      '-' +
                      nro_trans +
                      '-' +
                      dto.anexo_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    id_empresa: dto.id_empresa,
                    cod_articulo:
                      dto.cod_articulo,
                  },
                },
              );

            lineasCpfStockaux =
              await this.prisma.cpf_stockaux.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    cantidad: dto.cantidad,
                    cantidad2: dtoLineas[i].peso,
                    cantidad3: pesoPromedioUnidad,
                    signo: 1,
                    nro_lote:
                      'LOT-' +
                      fechaLote +
                      '-' +
                      nro_trans +
                      '-' +
                      dto.anexo_lote,
                    cod_identidad:
                      dtoLineas[i].caravana,
                    fecha: formattedDate,
                    id_motivo_stk:
                      dto.id_motivo_mov_stk,
                    cod_articulo:
                      dto.cod_articulo,
                    id_unidad_stk:
                      dto.id_unidad_stk,
                    id_empresa: dto.id_empresa,
                    id_estado_stock:
                      dto.id_estado_stock,
                      id_sector: dto.id_sector,
                  },
                },
              );


              const obtengoSexoAnimales =  await this.ganadoService.obtengoSexoAnimales(dto.id_categoria_ganado, dto.id_raza_ganado); 
          

              await this.prisma.cpt_identidad.create({
                data: {
  
                  nro_lote:
                  'LOT-' +
                  fechaLote +
                  '-' +
                  nro_trans +
                  '-' +
                  dto.anexo_lote,
                  cod_identidad: dtoLineas[i].caravana,                 
                  cod_articulo: dto.cod_articulo,
                  meses:0,// VER COMO LO RESOLVEMOS
                  peso_inicial:dtoLineas[i].peso,   
                  fecha_entrada:formattedDate, 
                  id_categoria_ganado:parseInt(dto.id_categoria_ganado, 10),
                  id_marca_ganado:parseInt(dto.id_raza_ganado, 10),
                  cruza:'',
                  dias:0, /// VER COMO LO RESOLVEMOS
                  documento_ingreso:dto.serie_guia+'-'+dto.nro_guia,
                  errores:'No',
                  fecha_ingreso:formattedDate,
                  fecha_identificacion:formattedDate,    
                  propietario:dto.dicose.toString(),
                  sexo:obtengoSexoAnimales.sexo,
                  ubicacion:dto.dicose.toString(),
                  tenedor:dto.dicose.toString(),
                  status_vida:'Vivo',
                  status_trazabilidad:'Trazado',
                  id_empresa:dto.id_empresa,


 

    
                }});              





          }

          //cpf_log
          cpf_log =
            await this.prisma.cpf_log.create({
              data: {
                nro_trans: nro_trans,
                id_registro: idRegistro,
                id_accion: 1,
                id_seccion: 48,
                fecha: formattedDate,
                descripcion:
                  'Alta  de stock ganado por nacimiento',
                cod_docum: 'altaStockNacGnd',
                observacion:
                  'Alta stock de ganado por nacimiento',
                  id_empresa:dto.id_empresa
              },
            });


          return {
            nro_trans: nro_trans,
            nro_lote:
              'LOT-' +
              fechaLote +
              '-' +
              nro_trans +
              '-' +
              dto.anexo_lote,
            message: 'Carga realizada con exito',
          };



        }else{


        }



          break;


          

          case 'registrosanitario':
            //Obtengo el nro de transaccion
            let codArticuloInsertActual:string='';
            let codArticuloInsertNuevo:string='';

            cabezal =
              await this.prisma.cpt_movimiento_stock.create(
                {
                  data: {
                    nro_trans: nro_trans,
                    peso_total_real:
                      dto.peso_total_real,
                    peso_total_facturado:
                      dto.peso_total_facturado,
                    cantidad_ganado:
                      dto.cantidad_total,
                    fecha: formattedDate,
                    serie_guia: '0',
                    nro_guia: '0',
                    valor_dicose: 0,
                    id_propiedad_ganado:0,
                    cod_articulo: 'NOASIG',
                    id_tipo_toma_peso:0,
                    id_motivo_stk:dto.id_motivo_mov_stk,
                    bania_garrapata:false,
                    nro_lote:'0',
                  },
                },
              );
  
            idRegistro = cabezal.id;
  
          
              cabezalSanitario =
                await this.prisma.cpt_registro_sanitario.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      peso_total_real:
                        dto.peso_total_real,
                      peso_total_facturado:
                        dto.peso_total_facturado,
                      cantidad_ganado:
                        dto.cantidad_total,
                      fecha: formattedDate,
                      en_alta: false,
                      id_motivo_sanitario: parseInt(dto.id_motivo_sanitario, 10),
                      id_empresa: dto.id_empresa,
                    },
                  },
                );
  
              idRegistroSanitario =
                cabezalSanitario.id;
         
            //como proceso las lineas?
            dtoLineas = dto.lineas;
            dtoLineas: AccionMasivaLoteLineas;
  
            //console.log(dtoLineas);
            dtoCpfStockaux: AgregarCpfStockaux;
  
            for (
              var i = 0;
              i < dtoLineas.length;
              ++i
            ) {

              // TENGO QUE VER SI ES TEST DE EMBARAZO dto.id_motivo_sanitario = 6 


              var animalAProcesarString: any =
              await this.ganadoService.getGanadoById(
                dtoLineas[i].caravana,
              );

              var animalAProcesar = animalAProcesarString[0][0];

              if (dto.id_motivo_sanitario==6 ){
                  if (dtoLineas[i].preniada=='S'){

                    codArticuloInsertActual = animalAProcesar.cod_articulo;
                    codArticuloInsertNuevo = 'VACPRECRU';

                  }else{


                    codArticuloInsertActual = animalAProcesar.cod_articulo;
                    codArticuloInsertNuevo = 'VACVACCRU';

                  }

              }else{

                codArticuloInsertActual = animalAProcesar.cod_articulo;
                codArticuloInsertNuevo = animalAProcesar.cod_articulo;

              }
              /*
              dto.cantidad_total viene con la cantidad total de animales
              dto.peso_total_facturado  es el nuevo peso de la muestra (total de bichos muestreados)
              dto.peso_total_real es el peso actual de la muestra (total de bichos muestreados)
                */
              var pesoPromedioUnidad =(dtoLineas[i].peso *dto.peso_total_facturado) /dto.peso_total_real;
              var pesoPromedioUnidadFormateado = pesoPromedioUnidad.toFixed(2);

              var nuevoCantidad2 =  (dto.peso_total_facturado * animalAProcesar.cantidad2)/dto.peso_total_real
              var nuevoCantidad3 =  (dto.peso_total_facturado * animalAProcesar.cantidad3)/dto.peso_total_real


              lineas =
                await this.prisma.cpp_movimiento_stock.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      cantidad: 1,
                      cantidad2: (dtoLineas[i].peso===0) ? nuevoCantidad2.toFixed(2) : dtoLineas[i].peso,
                      cantidad3: (dtoLineas[i].peso===0) ? nuevoCantidad3.toFixed(2) : dtoLineas[i].peso,
                      fecha: formattedDate,
                      nro_lote:animalAProcesar.nro_lote,
                      cod_identidad: dtoLineas[i].caravana,
                      id_empresa: dto.id_empresa,
                      cod_articulo:codArticuloInsertNuevo,
                    },
                  },
                );
                

              if (dto.pesada_muestra){
                //bajo el peso anterior
                //console.log(animalAProcesar)
                //console.log('ACA')
                      lineasCpfStockaux =
                        await this.prisma.cpf_stockaux.create(
                          {
                            data: {
                              nro_trans: nro_trans,
                              cantidad: animalAProcesar.cantidad,
                              cantidad2: animalAProcesar.cantidad2,
                              cantidad3: animalAProcesar.cantidad3,
                              signo: -1,
                              nro_lote:animalAProcesar.nro_lote,
                              cod_identidad:animalAProcesar.cod_identidad,
                              fecha: formattedDate,
                              id_motivo_stk:animalAProcesar.id_motivo_stk,
                              cod_articulo:codArticuloInsertActual,
                              id_unidad_stk:animalAProcesar.id_unidad_stk,
                              id_empresa: animalAProcesar.id_empresa,
                              id_estado_stock:animalAProcesar.id_estado_stock,
                              id_sector: animalAProcesar.id_sector,
                            },
                          },
                        );
          


                        //subo el nuevo peso
                        lineasCpfStockaux =
                        await this.prisma.cpf_stockaux.create(
                          {
                            data: {
                              nro_trans: nro_trans,
                              cantidad: 1,
                              cantidad2: (dtoLineas[i].peso===0) ? nuevoCantidad2.toFixed(2) : dtoLineas[i].peso,
                              cantidad3: (dtoLineas[i].peso===0) ? nuevoCantidad3.toFixed(2) : dtoLineas[i].peso,
                              signo: 1,
                              nro_lote:'0',
                              cod_identidad:
                                dtoLineas[i].caravana,
                              fecha: formattedDate,
                              id_motivo_stk:dto.id_motivo_mov_stk,
                              cod_articulo:codArticuloInsertNuevo,
                              id_unidad_stk:
                              animalAProcesar.id_unidad_stk,
                              id_empresa: dto.id_empresa,
                              id_estado_stock:
                              animalAProcesar.id_estado_stock,
                              id_sector: animalAProcesar.id_sector,
                            },
                          },
                        );


                }else{

                  lineasCpfStockaux =
                  await this.prisma.cpf_stockaux.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: animalAProcesar.cantidad,
                        cantidad2: animalAProcesar.cantidad2,
                        cantidad3: animalAProcesar.cantidad3,
                        signo: -1,
                        nro_lote:animalAProcesar.nro_lote,
                        cod_identidad:animalAProcesar.cod_identidad,
                        fecha: formattedDate,
                        id_motivo_stk:animalAProcesar.id_motivo_stk,
                        cod_articulo:codArticuloInsertActual,
                        id_unidad_stk:animalAProcesar.id_unidad_stk,
                        id_empresa: animalAProcesar.id_empresa,
                        id_estado_stock:animalAProcesar.id_estado_stock,
                        id_sector: animalAProcesar.id_sector,
                      },
                    },
                  );

                  lineasCpfStockaux =
                  await this.prisma.cpf_stockaux.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: animalAProcesar.cantidad,
                        cantidad2: animalAProcesar.cantidad2,
                        cantidad3: animalAProcesar.cantidad3,
                        signo: 1,
                        nro_lote:animalAProcesar.nro_lote,
                        cod_identidad:animalAProcesar.cod_identidad,
                        fecha: formattedDate,
                        id_motivo_stk:animalAProcesar.id_motivo_stk,
                        cod_articulo:codArticuloInsertNuevo,
                        id_unidad_stk:animalAProcesar.id_unidad_stk,
                        id_empresa: animalAProcesar.id_empresa,
                        id_estado_stock:animalAProcesar.id_estado_stock,
                        id_sector: animalAProcesar.id_sector,
                      },
                    },
                  );

                }

          
                lineasSanitarias =
                  await this.prisma.cpp_registro_sanitario.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: 1,
                        cantidad2: (dtoLineas[i].peso!==0) ? nuevoCantidad2.toFixed(2) : dtoLineas[i].peso,
                        cantidad3: (dtoLineas[i].peso!==0) ? nuevoCantidad3.toFixed(2) : dtoLineas[i].peso,
                        fecha: formattedDate,
                        nro_lote:'0',
                        cod_identidad:
                          dtoLineas[i].caravana,
                        id_empresa: dto.id_empresa,
                        cod_articulo:codArticuloInsertNuevo,
                        id_padre:idRegistroSanitario,
                        id_motivo_sanitario: parseInt(dto.id_motivo_sanitario, 10),
                      },
                    },
                  );

                  await this.prisma.cpf_registro_sanitario.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: dto.cantidad,
                        cantidad2:dtoLineas[i].peso,
                        cantidad3:pesoPromedioUnidad,
                        fecha: formattedDate,
                        signo:1,
                        nro_lote:'0',
                        cod_identidad:dtoLineas[i].caravana,
                        id_empresa: dto.id_empresa,
                        cod_articulo:codArticuloInsertNuevo,
                        id_padre:idRegistroSanitario,
                        id_motivo_sanitario:parseInt(dto.id_motivo_sanitario, 10)
                      },
                    },
                  );

              
            }
  
            //cpf_log
            //console.log(idRegistro);
            //console.log(formattedDate);
            //console.log(nro_trans)
            cpf_log =
              await this.prisma.cpf_log.create({
                data: {
                  nro_trans: nro_trans,
                  id_registro: idRegistro,
                  id_accion: 1,
                  id_seccion: 48,
                  fecha: formattedDate,
                  descripcion:  dto.pesada_muestra
                  ? 'Registro sanitario con pesada'
                  : 'Registro sanitario sin pesada',
                  cod_docum:  dto.pesada_muestra
                  ? 'regSanitarioConPesada'
                  : 'regSanitarioSinPesada',
                  observacion: dto.pesada_muestra
                    ? 'Registro sanitario con pesada'
                    : 'Registro sanitario sin pesada',
                    id_empresa:dto.id_empresa
                },
              });
            return {
              nro_trans: nro_trans,
              message: 'Carga realizada con exito',
            };
            break;





            case 'pesadastk':
              //Obtengo el nro de transaccion
    
              cabezal =
                await this.prisma.cpt_movimiento_stock.create(
                  {
                    data: {
                      nro_trans: nro_trans,
                      peso_total_real:
                        dto.peso_total_real,
                      peso_total_facturado:
                        dto.peso_total_facturado,
                      cantidad_ganado:
                        dto.cantidad_total,
                      fecha: formattedDate,
                      serie_guia: '0',
                      nro_guia: '0',
                      valor_dicose: 0,
                      id_propiedad_ganado:0,
                      cod_articulo: 'NOASIG',
                      id_tipo_toma_peso:0,
                      id_motivo_stk:dto.id_motivo_stk,
                      bania_garrapata:false,
                      nro_lote:'0',
                    },
                  },
                );
    
              idRegistro = cabezal.id;
    
 
           
              //como proceso las lineas?
              dtoLineas = dto.lineas;
              dtoLineas: AccionMasivaLoteLineas;
    
              //console.log(dtoLineas);
              dtoCpfStockaux: AgregarCpfStockaux;
    
              for (
                var i = 0;
                i < dtoLineas.length;
                ++i
              ) {
  
  
                var animalAProcesarString: any =
                await this.ganadoService.getGanadoById(
                  dtoLineas[i].caravana,
                );
  
              var animalAProcesar = animalAProcesarString[0][0];
  
                /*
                dto.cantidad_total viene con la cantidad total de animales
                dto.peso_total_facturado  es el nuevo peso de la muestra (total de bichos muestreados)
                dto.peso_total_real es el peso actual de la muestra (total de bichos muestreados)
                  */
                var pesoPromedioUnidad =(dtoLineas[i].peso *dto.peso_total_facturado) /dto.peso_total_real;
                var pesoPromedioUnidadFormateado = pesoPromedioUnidad.toFixed(2);
  
                var nuevoCantidad2 =  (dto.peso_total_facturado * animalAProcesar.cantidad2)/dto.peso_total_real
                var nuevoCantidad3 =  (dto.peso_total_facturado * animalAProcesar.cantidad3)/dto.peso_total_real
                  ///falta resolver el tema de los 
  
  
                lineas =
                  await this.prisma.cpp_movimiento_stock.create(
                    {
                      data: {
                        nro_trans: nro_trans,
                        cantidad: 1,
                        cantidad2: (dtoLineas[i].peso===0) ? nuevoCantidad2.toFixed(2) : dtoLineas[i].peso,
                        cantidad3: (dtoLineas[i].peso===0) ? nuevoCantidad3.toFixed(2) : dtoLineas[i].peso,
                        fecha: formattedDate,
                        nro_lote:animalAProcesar.nro_lote,
                        cod_identidad: dtoLineas[i].caravana,
                        id_empresa: dto.id_empresa,
                        cod_articulo:animalAProcesar.cod_articulo,
                      },
                    },
                  );
    
      
                  //bajo el peso anterior
                        lineasCpfStockaux =
                          await this.prisma.cpf_stockaux.create(
                            {
                              data: {
                                nro_trans: nro_trans,
                                cantidad: animalAProcesar.cantidad,
                                cantidad2: animalAProcesar.cantidad2,
                                cantidad3: animalAProcesar.cantidad3,
                                signo: -1,
                                nro_lote:animalAProcesar.nro_lote,
                                cod_identidad:animalAProcesar.cod_identidad,
                                fecha: formattedDate,
                                id_motivo_stk:animalAProcesar.id_motivo_stk,
                                cod_articulo:animalAProcesar.cod_articulo,
                                id_unidad_stk:animalAProcesar.id_unidad_stk,
                                id_empresa: animalAProcesar.id_empresa,
                                id_estado_stock:animalAProcesar.id_estado_stock,
                                id_sector: animalAProcesar.id_sector,
                              },
                            },
                          );
            
  
  
                          //subo el nuevo peso
                          lineasCpfStockaux =
                          await this.prisma.cpf_stockaux.create(
                            {
                              data: {
                                nro_trans: nro_trans,
                                cantidad: 1,
                                cantidad2:  dtoLineas[i].peso,
                                cantidad3:  dtoLineas[i].peso,
                                signo: 1,
                                nro_lote:'0',
                                cod_identidad:
                                  dtoLineas[i].caravana,
                                fecha: formattedDate,
                                id_motivo_stk:
                                  dto.id_motivo_mov_stk,
                                cod_articulo:
                                animalAProcesar.cod_articulo,
                                id_unidad_stk:
                                animalAProcesar.id_unidad_stk,
                                id_empresa: dto.id_empresa,
                                id_estado_stock:
                                animalAProcesar.id_estado_stock,
                                id_sector: animalAProcesar.id_sector,
                              },
                            },
                          );
  
  
                
  
            

              }
    
              //cpf_log
              //console.log(idRegistro);
              //console.log(formattedDate);
              //console.log(nro_trans)
              cpf_log =
                await this.prisma.cpf_log.create({
                  data: {
                    nro_trans: nro_trans,
                    id_registro: idRegistro,
                    id_accion: 1,
                    id_seccion: 48,
                    fecha: formattedDate,
                    descripcion:  'Registro de pesada',
                    cod_docum:  'regPesada',
                    observacion: 'Registro de pesada',
                    id_empresa:dto.id_empresa
                  },
                });
              return {
                nro_trans: nro_trans,
                message: 'Carga realizada con exito',
              };
              break;





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

  async obtengoInsumo(insumoId:number, empresaId:number){

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


  async obtengoNroTrans() {
    const numerador =
      await this.prisma.numerador.findFirst({
        where: {
          descripcion: 'nro_trans',
          estado: 'S',
        },
      });

    const updateNumerador =
      await this.prisma.numerador.update({
        where: {
          id: numerador.id,
        },
        data: {
          valor: numerador.valor + 1,
        },
      });

    return numerador.valor + 1;
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

