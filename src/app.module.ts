import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
/*import { PaginasModule } from './modules/page/paginas.module';
import { PublicacoesModule } from './modules/publication/publicacoes.module';
import { CurtidasModule } from './modules/likes/curtidas.module';*/
import { IndexModule } from './modules/authentication/index.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    /*PaginasModule,
    PublicacoesModule,
    CurtidasModule,*/
    IndexModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
