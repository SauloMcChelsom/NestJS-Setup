import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe, ValidationError } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { join } from 'path';

import { AppModule } from './app.module';
import { BadRequestExceptions } from '@root/src/lib/exception/exception'
import { InitializeFirebase } from '@root/src/conf/firebase/initialize-firebase';
import { SwaggerDocument } from '@root/src/conf/swagger/swagger.conf';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(compression());
  new InitializeFirebase()
  new SwaggerDocument(app)

  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });

  /*----------------------------| Paginas Web |--------------------*/
  app.useStaticAssets(join(__dirname, '..', './src/views','public'));
  app.setBaseViewsDir(join(__dirname, '..', './src/','views'));
  app.setViewEngine('hbs');

  console.log(join(__dirname, '..', './src/views','public'))

  

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
      disableErrorMessages: false,

      /**
       *  qualquer propriedade não incluída na lista branca é automaticamente removida do objeto resultante
       */
      whitelist: true,

      /**
       * interromper o processamento da solicitação quando as propriedades não incluídas na lista
       */
      forbidNonWhitelisted:true,

      /**
       * As cargas que chegam pela rede são objetos JavaScript simples. 
       * Eles ValidationPipepodem transformar automaticamente cargas úteis em objetos digitados de acordo com suas classes DTO.
       */
      transform: true,

      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        var err = validationErrors

        var property = 'not_property'
        var key = 'not_key'
        var values = 'not values'
        
        var constraints = err[0].constraints

        if(property){
          property = err[0].property
        }

        if(constraints){
          key = Object.keys(constraints)[0]
          values = Object.values(constraints)[0]
        }
        
        throw new BadRequestExceptions({
          code:"property_"+property+"_"+key+"_pipe",
          message: values,
        })
      }, validationError: { target: false } 
    })
  );
  
 
  await app.listen(process.env.PORT || 3000);
  console.log('POSTGRES_HOST: ',process.env.TYPEORM_HOST)
  console.log('REDIS_HOST :   ',process.env.REDIS_HOST)
  console.log('ENV:           ',process.env.environment)

}

bootstrap();
