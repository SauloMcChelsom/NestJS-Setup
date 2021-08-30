import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IndexModule as UsuarioModule } from './modules/usuario/index.module';
import { IndexModule as PaginaModule } from './modules/pagina/index.module';
import {  PublicacaoModule } from './modules/publicacao/index.module';
import { IndexModule as CurtidasModule } from './modules/curtidas/index.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsuarioModule,
    PaginaModule,
    PublicacaoModule,
    CurtidasModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
