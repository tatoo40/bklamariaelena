import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    ValidationPipe,
    
  } from '@nestjs/common';

  import { JwtGuard } from '../auth/guard';
  import { AccionxIndService } from './accionxind.service';
import { Public } from 'src/auth/decorator';
import { GanadoService } from 'src/ganado/ganado.service';
import { UtilesService } from 'src/utiles/utiles.service';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  //@UseGuards(JwtGuard)

  @Controller('accionxind')
  export class AccionxIndController {
    constructor(
      private AccionxIndService: AccionxIndService,
      private GanadoService: GanadoService,
      private UtilesService: UtilesService
     
    ) {}
  

    @Get('/registros/:empresa')
    getRegistros(
  
      @Param('empresa') empresa:number

    ) {
      return this.AccionxIndService.getRegistros(
            
        empresa

      );
    }


    @Get(':tabla/:id')
    getGeneralById(

      @Param('id', ParseIntPipe) id: number,
      @Param('tabla') tabla:string

    ) {
      return this.AccionxIndService.getGeneralById(
            
            id,
            tabla

      );
    }




    //@Public()
    @HttpCode(HttpStatus.OK)
    @Post('/registros/:empresa')
    async accionxind( 

      @Body() dto

    ) 
    {

      let estado;
//console.log(dto)
      switch (dto.id_motivos_stk){

        //ES UNA AJUSTE EN ALTA
       
        case 3:
        case 1:

            const articuloExistente = await this.GanadoService.ctrlAnimalLoteYaProcesadoInd(dto.cod_identidad);

            if (!articuloExistente) {
              return {
                status: HttpStatus.BAD_REQUEST,
                message: 'El artículo ya está registrado.'
              };
            }


            estado = await this.AccionxIndService.accionxind(dto);

            if (estado.error){

              this.UtilesService.rollback('ajuAltaStkGndInd',estado.nro_trans);
              

              return {
                status: HttpStatus.BAD_REQUEST,
                data: estado.message,
                nro_trans:estado.nro_trans
              }

            }else{
            
              return {
              status: HttpStatus.CREATED,
              data: estado.message,
              nro_trans:estado.nro_trans
            
            }
          }

          break;
          //ES UN TRASLADO
          case 6:
          case 7:
          case 5:
          case 2:
          case 11:
          case 17:
          case 18:
          case 12:
            //VERIFICO EL ARTICULO QUE DESEO TRASLADAR DE UN LUGAR A OTRO EXISTA Y ESTE ACCTIVO
            // UNA VEZ VERIFCADO HAGO EL TRASLADO
            estado = await this.AccionxIndService.accionxind(dto);

            if (estado.error){

              this.UtilesService.rollback('movimientoStk',estado.nro_trans);
              

              return {
                status: HttpStatus.BAD_REQUEST,
                data: 'Ha ocurrido un error. Contactese con el proveedor',
                nro_trans:estado.nro_trans
              }

            }else{
            
              return {
              status: HttpStatus.CREATED,
              data: estado.message,
              nro_trans:estado.nro_trans
            
            }
          }

          break;



  }


    }
    
    @Get(':tabla')
    getGeneral(
  
      @Param('tabla') tabla:string

    ) {
      return this.AccionxIndService.getGeneral(
            
        tabla

      );
    }




  }
  