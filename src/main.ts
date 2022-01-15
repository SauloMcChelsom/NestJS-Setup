import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { BadRequestExceptions } from './shared/exception/exception'
import { join } from 'path';
import { AppModule } from './app.module';

import { initializeFirebase } from '@root/src/shared/firebase/initialize-firebase';

initializeFirebase();

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  /*---------------------| Documentação Swagger |------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /**/const config = new DocumentBuilder()/*-----------------------*/
  /**/.setTitle('Rede Social')/*-----------------------------------*/
  /**/.setDescription('Documentação da API Rede Social')/*---------*/
  /**/.setVersion('1.0')/*-----------------------------------------*/
  /**///.addBearerAuth()/*-----------------------------------------*/
  /**/.build();/*--------------------------------------------------*/
  /**/const document = SwaggerModule.createDocument(app, config);/**/
  /**/SwaggerModule.setup('/', app, document);/*-------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/

  /*---------------------------------| Paginas Web |-----------------------------*/
  /*-----------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------*/
  /**/app.useStaticAssets(join(__dirname, '..', './src/views','public'));/*------*/
  /**/app.setBaseViewsDir(join(__dirname, '..', './src','views'));/*-------------*/
  /**/app.setViewEngine('hbs');/*------------------------------------------------*/
  /*-----------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------*/

  app.useGlobalPipes(
    new ValidationPipe({
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

  console.log(process.env.PORT || 3000);
  console.log(process.env.TYPEORM_HOST)
  console.log(`.env.${process.env.NODE_ENV || 'development'}`)
                                               
}

bootstrap();
