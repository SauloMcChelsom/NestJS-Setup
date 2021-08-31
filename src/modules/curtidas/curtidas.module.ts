import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MinhasCurtidasEntity } from '../../entity/minhas-curtidas.entity'
import { CurtidasController } from './curtidas.controller'
import { CurtidasService } from './curtidas.service'
import { CurtidasRepository } from './curtidas.repository'
import { PublicacoesModule } from '../publicacoes/publicacoes.module'

@Module({
  imports: [PublicacoesModule, TypeOrmModule.forFeature([MinhasCurtidasEntity, CurtidasRepository])],
  controllers: [CurtidasController],
  providers: [CurtidasService],
  exports: [CurtidasService]

})
export class CurtidasModule {}


