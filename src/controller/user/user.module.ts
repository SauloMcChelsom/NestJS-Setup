import { Module } from '@nestjs/common';
import { AuthorModule } from '../author/author.module'
import { UsersModule } from '@model/users/user.module';

import { UsuariosController } from './user.controller';
import { UserService } from './user.service';

import { UserMapper } from './mapper'

@Module({
  imports: [
    AuthorModule,
    UsersModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserService,
    UserMapper
  ],
  exports: [UserService],
})
export class UserModule {}
