import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CryptUtilityModule } from '@shared/bcrypt/bcrypt.module'
import { UserEntity } from '@entity/user.entity'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'

import { UsuariosController } from './user.controller'
import { UserService } from './user.service'
import { UserModel } from './user.model'
import { UserRepository } from './user.repository'

@Module({
  imports: [CryptUtilityModule, TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UsuariosController],
  providers: [UserService, UserModel, FirebaseModel],
  exports: [UserService]
})
export class UserModule {}


