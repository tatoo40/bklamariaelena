import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('JWT_SECRET'),
        passReqToCallback: true,
    });
  }

  async validate(req:Request, payload: any) {

    const refreshToken = req.get('autohrization').replace('Bearer','').trim()

 
    return {
        ...payload,
        refreshToken,
    }
  }
}
