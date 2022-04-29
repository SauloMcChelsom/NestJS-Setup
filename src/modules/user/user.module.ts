import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entity/user.entity';
import { AuthModule } from '../auth/auth.module'

import { UsuariosController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository';

import {
  CreateMapper,
  AuthListMapper,
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
} from './mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    AuthModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserService,
    UserModel,
    AuthListMapper,
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper,
    CreateMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
