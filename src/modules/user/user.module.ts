import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CryptUtilityModule } from '@shared/bcrypt/bcrypt.module'
import { UserEntity } from '@entity/user.entity'
import { UsuariosController } from './user.controller'
import { UserService } from './user.service'
import { UserModel } from './user.model'
import { UserRepository } from './user.repository'
import { PerfilUserMapper } from './mapper/perfil-user.mapper'
import { CheckUserExistsByEmailMapper } from './mapper/check-user-exists-by-email.mapper'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'

@Module({
  imports: [CryptUtilityModule, TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UsuariosController],
  providers: [UserService, UserModel, FirebaseModel, PerfilUserMapper, CheckUserExistsByEmailMapper],
  exports: [UserService]
})
export class UserModule {}


