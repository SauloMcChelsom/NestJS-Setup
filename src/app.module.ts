import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PaginasModule } from './modules/paginas/paginas.module';
import { PublicacoesModule } from './modules/publicacoes/publicacoes.module';
import { CurtidasModule } from './modules/curtidas/curtidas.module';
import { IndexModule } from './modules/authentication-firebase/index.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsuariosModule,
    PaginasModule,
    PublicacoesModule,
    CurtidasModule,
    IndexModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
