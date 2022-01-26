import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


export class SwaggerDocument {
    constructor(app){
        const config = new DocumentBuilder()
        .setTitle('Rede Social')
        .setDescription('Documentação da API Rede Social')
        .setVersion('1.0')
        //.addBearerAuth()
        .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/', app, document);
    }

}

