import { Module } from '@nestjs/common';
import { AuthorModule } from '../author/author.module'
import { UsersModule } from '@model/users/user.module';

import { UsuariosController } from './user.controller';
import { UserService } from './user.service';

import {
  CreateMapper,
  AuthListMapper,
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
} from './mapper';

@Module({
  imports: [
    AuthorModule,
    UsersModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserService,
    AuthListMapper,
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper,
    CreateMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
