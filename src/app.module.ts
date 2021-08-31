import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PaginasModule } from './modules/paginas/paginas.module';
import { PublicacoesModule } from './modules/publicacoes/publicacoes.module';
import { CurtidasModule } from './modules/curtidas/curtidas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsuariosModule,
    PaginasModule,
    PublicacoesModule,
    CurtidasModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
