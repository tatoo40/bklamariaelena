import { Module } from '@nestjs/common';
import { GeneralPublicController } from './generalPublic.controller';
import { GeneralPublicService } from './generalPublic.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/strategy';
import { GoogleStrategy } from '../auth/strategy/google.strategy';
import { SessionSerializer } from 'src/auth/utils/serializer'; 



@Module({
  imports: [JwtModule.register({})],
  controllers: [GeneralPublicController],
  providers: [GeneralPublicService,JwtStrategy, AuthService,
    GoogleStrategy,{
    provide:'AUTH_SERVICE',
    useClass:AuthService
  }, SessionSerializer]
})



export class GeneralPublicModule {}

