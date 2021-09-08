import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException, ValidationError } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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

  /*-------------------| Paginas Web |-----------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /**/app.useStaticAssets(join(__dirname, '..', './src','public'));/*------*/
  /**/app.setBaseViewsDir(join(__dirname, '..', './src','views'));/*-------*/
  /**/app.setViewEngine('hbs');/*----------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/
  /*---------------------------------------------------------------*/

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      }, validationError: { target: false } 
    })
  );

  await app.listen(3000, '192.168.18.11');

  console.log(`                 `);
  console.log(`                 `);
  console.log(`                   ${await app.getUrl()}`);
  console.log(`                 `);
  console.log(`                 `);

}

bootstrap();
