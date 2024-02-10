 import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateArticuloDto,
  EditArticuloDto,
} from './dto';

@Injectable()
export class ArticuloService {
  constructor(private prisma: PrismaService) {}

  getArticulos() {
    return this.prisma.articulo.findMany({
 
    });
  }

  getArticuloById(
   
    articuloId: number,
  ) {
    return this.prisma.articulo.findFirst({
      where: {
        id: articuloId
      
      },
    });
  }

  async createArticulo(
  
    dto: CreateArticuloDto,
  ) {
    const articulo =
      await this.prisma.articulo.create({
        data: {
      
          ...dto,
        },
      });

    return articulo;
  }

  async editArticuloById(

    articuloId: number,
    dto: EditArticuloDto,
  ) {
    // get the bookmark by id
    const articulo =
      await this.prisma.articulo.findUnique({
        where: {
          id: articuloId,
        },
      });

    // check if user owns the bookmark
    if (!articulo )
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.articulo.update({
      where: {
        id: articuloId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteArticuloById(

    articuloId: number,
  ) {
    const articulo =
      await this.prisma.articulo.findUnique({
        where: {
          id: articuloId,
        },
      });

    // check if user owns the bookmark
    if (!articulo )
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.articulo.delete({
      where: {
        id: articuloId,
      },
    });
  }
}
 