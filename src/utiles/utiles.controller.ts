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
    Query,
    UseGuards,
    
  } from '@nestjs/common';

  import { JwtGuard } from '../auth/guard';
  import { UtilesService } from './utiles.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('utiles')
  export class UtilesController {
    constructor(
      private utilesService: UtilesService,
     
    ) {}
  
    
    @Get(':id_empresa/facturasprov')
    getFacturasProv(
      @Param('id_empresa', ParseIntPipe) id_empresa: number,


    ) {
      return this.utilesService.getFacturasProv(

        id_empresa

      );
    }
 
    @Get(':id_empresa/romaneos')
    getRomaneos(
      @Param('id_empresa', ParseIntPipe) id_empresa: number,


    ) {
      return this.utilesService.getRomaneos(

        id_empresa

      );
    }


    @Get(':id_empresa/romaneos/lineas')
    getLineasRomaneo(
      @Param('id_empresa', ParseIntPipe) id_empresa: number


    ) {
      return this.utilesService.getLineasRomaneo(

        id_empresa
  

      );
    }

    @Get(':id_empresa/facturasprov/lineas')
    getLineasFacturaProv(
      @Param('id_empresa', ParseIntPipe) id_empresa: number


    ) {
      return this.utilesService.getLineasFacturaProv(

        id_empresa
  

      );
    }
    
    @Get(':id_empresa/proveedoresParaFacturar')
    getProveedoresxaFact(
      @Param('id_empresa', ParseIntPipe) id_empresa: number,


    ) {
      return this.utilesService.getProveedoresxaFact(

        id_empresa

      );
    }


    @Get(':id_empresa/clientesRomaneo')
    getClientesRomaneo(
      @Param('id_empresa', ParseIntPipe) id_empresa: number,


    ) {
      return this.utilesService.getClientesRomaneo(

        id_empresa

      );
    }

    
    @Get(':id_empresa/lotesDeSalida')
    getLotesDeSalida(
      @Param('id_empresa', ParseIntPipe) id_empresa: number
    ) {
      return this.utilesService.getLotesSalida(

        id_empresa

      );
    }

    @Get(':id_empresa/animalesLoteSalida/:nrotrans')
    getAnimalesLoteSalida(
      @Param('nrotrans', ParseIntPipe) nrotrans: number,
      @Param('id_empresa', ParseIntPipe) id_empresa: number
    ) {
      return this.utilesService.getAnimalesLoteSalida(

        id_empresa,
        nrotrans

      );
    }


    

    @Get(':id_empresa/lotesDeEntradaACostear')
    getLotesDeEntradaACostear(
      @Param('id_empresa', ParseIntPipe) id_empresa: number
    ) {
      return this.utilesService.getLotesDeEntradaACostear(

        id_empresa

      );
    }

    @Get(':id_empresa/bultosDeEntradaACostear/:trans')
    getBultosDeEntradaACostear(
      @Param('trans', ParseIntPipe) trans: number,
      @Param('id_empresa', ParseIntPipe) id_empresa: number
    ) {
      return this.utilesService.getBultosDeEntradaACostear(
        trans,
        id_empresa

      );
    }
    


    @Post('cargarFactProv')
    guardarFactProv( 

     
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.utilesService.guardarFactProv(
        dto
      );
    }

    @Post('guardarRomaneo')
    guardarRomaneo( 

     
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.utilesService.guardarRomaneo(
        dto
      );
    }


    @Delete('eliminoFactProv/:id')
    eliminoFactProv( 
      @Param('id', ParseIntPipe) id: number,

    ) 
    {
      //console.log(dto)
      return this.utilesService.eliminoFactProv(
        id
      );
    }


    @Post('modificoArticulo/:id')
    modificoArticulo( 
      @Param('id', ParseIntPipe) id: string,
      @Body() dto

    ) 
    {
      //console.log(dto)
      return this.utilesService.modificoArticulo(
        0,
        id,
        dto
      );
    }

    
    @Delete('eliminoRomaneo/:id')
    eliminoRomaneo( 
      @Param('id', ParseIntPipe) id: number,

    ) 
    {
      //console.log(dto)
      return this.utilesService.eliminoRomaneo(
        id
      );
    }  

    

    @Get(':id_empresa/articulosFactxProv/:id_proveedor')
    getArticulosProv(
      @Param('id_empresa', ParseIntPipe) id_empresa: number,
      @Param('id_proveedor', ParseIntPipe) id_proveedor: number,

    ) {
      return this.utilesService.getArticulosProv(
        id_proveedor,
        id_empresa
        

      );
    }


  }
  