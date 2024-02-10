import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import * as session from 'express-session'
import * as passport from 'passport'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(
    session({
      secret:'fsdfsdjfjdshfjkshfkjsdhfjksdhfs',
      saveUninitialized:false,
      resave:false,
      cookie:{
        maxAge:60000,
      }
    })
  )
 



  
 
  app.use(passport.initialize());
  app.use(passport.session());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3334);
  const logger = new Logger('bootstrap');
  logger.log(`Listening on ${await app.getUrl()}`);
}
bootstrap();
