import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PaginasController } from './paginas.controller'
import { PaginasService } from './paginas.service'
import { PaginasRepository } from './paginas.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PaginasRepository])],
  controllers: [PaginasController],
  providers: [PaginasService],
  exports: [PaginasService]
})
export class PaginasModule {}


