import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entity/user.entity';
import { FirebaseModule } from '@root/src/modules/firebase/firebase.module';
import { JwtService } from '@nestjs/jwt'

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
    FirebaseModule,
  ],
  controllers: [UsuariosController],
  providers: [
    UserService,
    UserModel,
    JwtService,
    AuthListMapper,
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper,
    CreateMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
