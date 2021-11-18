import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CryptUtilityModule } from '@shared/bcrypt/bcrypt.module'
import { UserEntity } from '@entity/user.entity'
import { UsuariosController } from './user.controller'
import { UserService } from './user.service'
import { UserValidate } from './user.validate'
import { UserRepository } from './user.repository'
import { PerfilUserMapper } from './mapper/perfil-user.mapper'
import { CheckUserExistsByEmailMapper } from './mapper/check-user-exists-by-email.mapper'
import { FirebaseValidate } from '@modules/firebase/firebase.validate'

@Module({
  imports: [CryptUtilityModule, TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UsuariosController],
  providers: [UserService, UserValidate, FirebaseValidate, PerfilUserMapper, CheckUserExistsByEmailMapper],
  exports: [UserService]
})
export class UserModule {}


