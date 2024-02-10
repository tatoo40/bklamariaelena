import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import {CreateUsuarioDto} from './dto/create-usuario.dto';
  import {EditUsuarioDto} from './dto/edit-usuario.dto';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';  
  import * as argon from 'argon2';
  import { ConfigService } from '@nestjs/config'; 
  import { JwtService } from '@nestjs/jwt';

  


  @Injectable()
  export class UsuarioService {
    constructor(private prisma: PrismaService, private config:ConfigService, private jwt: JwtService) {}
  
    
    getUsuarios(userId: number) {
      return this.prisma.usuario.findMany({
        
      });
    }
  
    getUsuariosById(
      userId: number
    ) {
      return this.prisma.usuario.findFirst({
        where: {
          id: userId
        },
      });
    }
  
    getUsuariosByEmail(
      email:string
    ) {
      return this.prisma.usuario.findFirst({
        where: {
          email: email
        },
      });
    }
  



    async createUsuario(
      dto: CreateUsuarioDto,
    ) {
            // generate the password hash
            
            const hash = await argon.hash(dto.hash);
            // save the new user in the db
            try {
            const usuario = await this.prisma.usuario.create({
                data: {
                  email: dto.email,
                  nombre: dto.nombre,
                  apellido: dto.apellido,
                  telefono_contacto: dto.telefono_contacto,
                  id_mod: 1,             
                  hash,
                  hashRt:'',
                  id_rol:dto.id_rol,
                  isRegisteredWithGoogle:dto.isRegisteredWithGoogle
                },
            });

            return this.signToken(usuario.id, usuario.email);
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

    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '30m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
  


    async editUsuarioById(
      userId: number,
      dto: EditUsuarioDto,
    ) {
      // get the bookmark by id
      const usuario =
        await this.prisma.usuario.findUnique({
          where: {
            id: userId,
          },
        });
  
      // check if user owns the bookmark
      if (!usuario || usuario.id !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      return this.prisma.usuario.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });
    }
  
    async deleteUsuarioById(
      userId: number
    ) {
      const usuario =
        await this.prisma.usuario.findUnique({
          where: {
            id: userId,
          },
        });
  
      // check if user owns the bookmark
      if (!usuario || usuario.id !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      await this.prisma.usuario.delete({
        where: {
          id: userId,
        },
      });
    }
  }
  