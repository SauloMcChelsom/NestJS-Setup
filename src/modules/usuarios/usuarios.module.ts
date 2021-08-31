import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioEntity } from '../../entity/usuario.entity'
import { UsuariosController } from './usuarios.controller'
import { UsuariosService } from './usuarios.service'
import { UsuariosRepository } from './usuarios.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, UsuariosRepository])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}


