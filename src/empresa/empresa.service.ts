import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import {
    CreateEmpresaDto,
    EditEmpresaDto,
  } from './dto';
  
  @Injectable()
  export class EmpresaService {
    constructor(private prisma: PrismaService) {}
  
    getEmpresas() {
      return this.prisma.empresa.findMany({
     
      });
    }
  
    getEmpresaById(
      userId: number,
      empresaId: number,
    ) {
      return this.prisma.empresa.findFirst({
        where: {
          id: empresaId
          
        },
      });
    }
  
    async createEmpresa(
      dto: CreateEmpresaDto,
    ) {
      const empresa =
        await this.prisma.empresa.create({
          data: {
            ...dto,
          },
        });
  
      return empresa;
    }
  
    async editEmpresaById(
  
      empresaId: number,
      dto: EditEmpresaDto,
    ) {
      // get the bookmark by id
      const empresa =
        await this.prisma.empresa.findUnique({
          where: {
            id: empresaId,
          },
        });
  
      // check if user owns the bookmark
      if (!empresa || empresa.id !== empresaId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      return this.prisma.empresa.update({
        where: {
          id: empresaId,
        },
        data: {
          ...dto,
        },
      });
    }
  
    async deleteEmpresaById(
      userId: number,
      empresaId: number,
    ) {
      const empresa =
        await this.prisma.empresa.findUnique({
          where: {
            id: empresaId,
          },
        });
  
      // check if user owns the bookmark
      if (!empresa || empresa.id !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      await this.prisma.empresa.delete({
        where: {
          id: empresaId,
        },
      });
    }
  }
  