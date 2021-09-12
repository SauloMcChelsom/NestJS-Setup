import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException, ValidationError } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

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
        console.log(validationErrors)
        return new BadRequestException(validationErrors);
      }, validationError: { target: false } 
    })
  );

  await app.listen(3000, '192.168.18.11');

  console.log(`                                                    `);
  console.log(`                                                    `);
  console.log(`                  ${await app.getUrl()}/auth/sign-in`);
  console.log(`                                                    `);
  console.log(`                                                    `);

}

bootstrap();
