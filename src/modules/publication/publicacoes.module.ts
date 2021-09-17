import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicationEntity } from '../../entity/publication.entity'
import { PublicacoesController } from './publicacoes.controller'
import { PublicacoesService } from './publicacoes.service'
import { PublicacoesRepository } from './publicacoes.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity, PublicacoesRepository])],
  controllers: [PublicacoesController],
  providers: [PublicacoesService],
  exports: [PublicacoesService]
})
export class PublicacoesModule {}


