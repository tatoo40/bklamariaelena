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
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { GanadoService } from './ganado.service';

@UseGuards(JwtGuard)

@Controller('ganado')
export class GanadoController {
  constructor(
    private ganadoService: GanadoService,
  ) {}

  @Get(':empresa')
  getGanando(
    @Param('empresa', ParseIntPipe) empresa: number
  ) {
    return this.ganadoService.getGanando(empresa

    );
  }

  @Get(':empresa/sector')
  getSectorGanado(
    @Param('empresa', ParseIntPipe) empresa: number,
    @Query() queryParams: Record<string, string>
  ) {


    const caravanasArray = Object.values(queryParams);

    // Ahora puedes comparar los valores de las caravanas o hacer lo que necesites con el array
    //console.log('Array de caravanas:', caravanasArray);

    return this.ganadoService.getSectorGanado(
      empresa,
      caravanasArray

    );
  }


  @Get(':empresa/deposito')
  getDepositoGanado(
    @Param('empresa', ParseIntPipe) empresa: number,
    @Query() queryParams: Record<string, string>
  ) {


    const caravanasArray = Object.values(queryParams);

    // Ahora puedes comparar los valores de las caravanas o hacer lo que necesites con el array
    //console.log('Array de caravanas:', caravanasArray);

    return this.ganadoService.getDepositoGanado(
      empresa,
      caravanasArray

    );
  }

  @Get(':empresa/indicadores/totalesanimales')
  getIndicadoresTotalesAnimales(
    @Param('empresa', ParseIntPipe) empresa: number
  ) {


    //const caravanasArray = Object.values(queryParams);

    // Ahora puedes comparar los valores de las caravanas o hacer lo que necesites con el array
    //console.log('Array de caravanas:', caravanasArray);

    return this.ganadoService.getIndicadoresTotalesAnimales(
      empresa,
      //caravanasArray

    );
  }
  @Get(':empresa/indicadores/entradassemanales')
  getEntradasSemanales(
    @Param('empresa', ParseIntPipe) empresa: number
  ) {


    //const caravanasArray = Object.values(queryParams);

    // Ahora puedes comparar los valores de las caravanas o hacer lo que necesites con el array
    //console.log('Array de caravanas:', caravanasArray);

    return this.ganadoService.getEntradasSemanales(
      empresa,
      //caravanasArray

    );
  }
  @Get(':empresa/indicadores/salidassemanales')
  getSalidasSemanales(
    @Param('empresa', ParseIntPipe) empresa: number
  ) {


    //const caravanasArray = Object.values(queryParams);

    // Ahora puedes comparar los valores de las caravanas o hacer lo que necesites con el array
    //console.log('Array de caravanas:', caravanasArray);

    return this.ganadoService.getSalidasSemanales(
      empresa,
      //caravanasArray

    );
  }

  @Get(':empresa/stockganadoactivo')
  getStockGanadoActivo(
    @Param('empresa', ParseIntPipe) empresa: number
  ) {


 

    return this.ganadoService.getStockGanadoActivo(
      empresa
    );
  }


  @Get(':empresa/stockganadoactivoprenadas')
  


  getStockGanadoActivoPrenadas(
    @Param('empresa', ParseIntPipe) empresa: number
  ) {

    console.log('dasdasdasd')

 

    return this.ganadoService.getStockGanadoActivoPrenadas(
      empresa
    );
  }
  

  @Get(':empresa/articuloxmarcaycategoria/:id_marca/:id_categoria')
  getArticuloxCatxMar(
    @Param('empresa', ParseIntPipe) empresa: number,
    @Param('id_marca', ParseIntPipe) id_marca: number,
    @Param('id_categoria', ParseIntPipe) id_categoria: number
  ) {


 

    return this.ganadoService.getArticuloxCatxMar(
      empresa,id_marca,id_categoria
    );
  }

  @Get(':id')
  getGanadoById(

    @Param('id', ParseIntPipe) ganadoId: string,
  ) {
    return this.ganadoService.getGanadoById(
   
      ganadoId,
    );
  }



}
