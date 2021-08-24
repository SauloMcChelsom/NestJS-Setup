import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IndexModule as UsuarioModule } from './modules/usuario/index.module';
import { IndexModule as PaginaModule } from './modules/pagina/index.module';
import { IndexModule as PublicacaoModule } from './modules/publicacao/index.module';
import { IndexModule as CurtidasModule } from './modules/curtidas/index.module';
import { IndexModule as MinhasCurtidasModule } from './modules/minhas-curtidas/index.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsuarioModule,
    PaginaModule,
    PublicacaoModule,
    CurtidasModule,
    MinhasCurtidasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
