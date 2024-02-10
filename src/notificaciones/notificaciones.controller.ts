import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
    
  } from '@nestjs/common';

  import { JwtGuard } from '../auth/guard';
  import { NotificacionesService } from './notificaciones.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('notificaciones')
  export class NotificacionesController {
    constructor(
      private generalService: NotificacionesService,
     
    ) {}
  
    
    @Get(':id_empresa/ganadosinpeso')
    getGanadoSinPeso(

      @Param('id_empresa', ParseIntPipe) id_empresa: number,

    ) {
      return this.generalService.getGanadoSinPeso(
        id_empresa
      );
    }
    @Get(':id_empresa/sanitariavencida')
    getSanitariaVencida(

      @Param('id_empresa', ParseIntPipe) id_empresa: number,

    ) {
      return this.generalService.getSanitariaVencida(
        id_empresa
      );
    }
    @Get(':id_empresa/entradasinfactura')
    getEntradaSinFactura(

      @Param('id_empresa', ParseIntPipe) id_empresa: number,

    ) {
      return this.generalService.getEntradaSinFactura(
        id_empresa
      );
    }    
    
    
    @Get(':id_empresa/comprasganado')
    getComprasGanado(

      @Param('id_empresa', ParseIntPipe) id_empresa: number,

    ) {
      return this.generalService.getComprasGanado(
        id_empresa
      );
    }

    @Get(':id_empresa/comprasinsumo')
    getComprasInsumo(

      @Param('id_empresa', ParseIntPipe) id_empresa: number,

    ) {
      return this.generalService.getComprasInsumo(
        id_empresa
      );
    }

  }
  