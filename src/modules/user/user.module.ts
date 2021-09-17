import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CryptUtilityModule } from '../../utility/crypt/crypt.utility.module'
import { UserEntity } from '../../entity/user.entity'
import { UsuariosController } from './user.controller'
import { UserService } from './user.service'
import { UserValidator } from './user.validator'
import { UserRepository } from './user.repository'

@Module({
  imports: [CryptUtilityModule, TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UsuariosController],
  providers: [UserService, UserValidator],
  exports: [UserService]
})
export class UserModule {}


