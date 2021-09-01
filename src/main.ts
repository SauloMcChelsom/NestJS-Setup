import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException, ValidationError } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Rede Social')
  .setDescription('Documentação da API Rede Social')
  .setVersion('1.0')
  //.addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      }, validationError: { target: false } 
    })
  );

  await app.listen(3000, '0.0.0.0');

  console.log(`                 `);
  console.log(`                 `);
  console.log(`                   ${await app.getUrl()}`);
  console.log(`                 `);
  console.log(`                 `);

}
bootstrap();
