import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/user/users.module';
import { IndexModule as CadastrarNovoUsuarioModule } from './modules/cadastrar-novo-usuario/index.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    CadastrarNovoUsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
