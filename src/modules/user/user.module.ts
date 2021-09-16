import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../../entity/user.entity'
import { UsuariosController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UsuariosController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}


