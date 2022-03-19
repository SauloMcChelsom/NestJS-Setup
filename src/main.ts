import { NestFactory } from '@nestjs/core';
import {
  VersioningType,
  HttpException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
//import helmet from 'helmet';
//import * as csurf from 'csurf';
import * as compression from 'compression';
import * as options from '@conf/cors/index.cors';
import { AppModule } from './app.module';
import { InitializeFirebase } from '@root/src/conf/firebase/initialize-firebase';
import { SwaggerDocument } from '@root/src/conf/swagger/swagger.conf';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(options.cors());

  app.use(compression());

  /*app.use(helmet())*/

  /*app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"],
        "script-src": ["'self'", "https: data:"],
        "script-src-attr": ["'self'", "https: data:"],
      }
    })
  )*/

  /*app.use(csurf());*/

  new InitializeFirebase();
  new SwaggerDocument(app);

  app.useStaticAssets(join(__dirname, '..', '..', 'src', 'views', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'src', 'views'));
  
  app.setViewEngine('hbs');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    /**
     * O ValidationPipefornece uma abordagem conveniente para impor regras de validação para todas as cargas de cliente recebidas
     */
    new ValidationPipe({
      /**
       * As mensagens de erro detalhados
       */
      disableErrorMessages: true,

      /**
       *  qualquer propriedade não incluída na lista branca é automaticamente removida do objeto resultante
       */
      whitelist: true,

      /**
       * interromper o processamento da solicitação quando as propriedades não incluídas na lista
       */
      forbidNonWhitelisted: true,

      /**
       * As cargas que chegam pela rede são objetos JavaScript simples.
       * Eles ValidationPipepodem transformar automaticamente cargas úteis em objetos digitados de acordo com suas classes DTO.
       */
      transform: true,

      validationError: { target: false },

      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const err = validationErrors;

        let property = 'not_property';
        let key = 'not_key';
        let values = 'not values';

        const constraints = err[0].constraints;

        if (property) {
          property = err[0].property;
        }

        if (constraints) {
          key = Object.keys(constraints)[0];
          values = Object.values(constraints)[0];
        }

        throw new HttpException(
          ['property_' + property + '_' + key + '_pipe', values],
          401,
        );
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log('POSTGRES_HOST: ', process.env.TYPEORM_HOST);
  console.log('REDIS_HOST :   ', process.env.REDIS_HOST);
  console.log('ENV:           ', process.env.environment);
}

bootstrap();
