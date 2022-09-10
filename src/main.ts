import { NestFactory } from '@nestjs/core';
import {
  VersioningType,
  HttpException,
  HttpStatus,
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
import { code } from '@root/src/shared/enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* respeita politica*/
  //app.enableCors(options.cors());

  /** liberado*/
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

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
        throw new HttpException({
          code : code.CLASS_VALIDATOR_FAILED,
          message : Object.values(err[0].constraints)[0],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      },
    }),
  );

  //captura erros não tratado
  //se não tive, o sistema quebra
  process.on('uncaughtException', (err, origin)=>{
    console.log(`\n ${origin} signal received. \n${err}`)
  })

  //se não tiver o sistema joga warn
  process.on('unhandledRejection', (err)=>{
    console.log(`\n unhandledRejection signal received. \n${err}`)
  })

  await app.listen(process.env.PORT || 8080);
  console.log('POSTGRES_HOST: ', process.env.TYPEORM_HOST);
  console.log('SERVER_PORT: ', process.env.PORT);
  console.log('ENV: ', process.env.environment);
}

bootstrap();
