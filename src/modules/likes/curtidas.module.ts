import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MinhasCurtidasEntity } from '../../entity/my-likes.entity'
import { CurtidasController } from './curtidas.controller'
import { CurtidasService } from './curtidas.service'
import { CurtidasRepository } from './curtidas.repository'
import { PublicacoesModule } from '../publication/publicacoes.module'

@Module({
  imports: [PublicacoesModule, TypeOrmModule.forFeature([MinhasCurtidasEntity, CurtidasRepository])],
  controllers: [CurtidasController],
  providers: [CurtidasService],
  exports: [CurtidasService]

})
export class CurtidasModule {}


