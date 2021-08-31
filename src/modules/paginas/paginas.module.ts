import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaginaEntity } from '../../entity/pagina.entity'
import { PaginasController } from './paginas.controller'
import { PaginasService } from './paginas.service'
import { PaginasRepository } from './paginas.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PaginaEntity, PaginasRepository])],
  controllers: [PaginasController],
  providers: [PaginasService],
  exports: [PaginasService]
})
export class PaginasModule {}


