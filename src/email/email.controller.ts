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
  import { EmailService } from './email.service';
import { Public } from 'src/auth/decorator';

  //import {CreateBookmarkDto,EditBookmarkDto} from './dto';
  
  @UseGuards(JwtGuard)
  
  @Controller('email')
  export class EmailController {
    constructor(
      private utilesService: EmailService,
     
    ) {}
  
    
    @Get(':id_empresa/facturasprov')
    getFacturasProv(
    
    ) {
    
    }
 

  }
  