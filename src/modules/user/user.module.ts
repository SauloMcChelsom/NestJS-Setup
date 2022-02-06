import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptUtilityModule } from '@root/src/lib/bcrypt/bcrypt.module';
import { UserEntity } from '@entity/user.entity';
import { FirebaseModule } from '@root/src/modules/firebase/firebase.module';

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
    CryptUtilityModule,
    FirebaseModule,
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
