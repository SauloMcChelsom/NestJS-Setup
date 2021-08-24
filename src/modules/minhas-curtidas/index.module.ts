import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinhasCurtidasEntity } from '../../entity/minhas-curtidas.entity';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { IndexRepository } from './index.repository'

import { IndexModule as CurtidasModules } from '../curtidas/index.module'
import { IndexService as CurtidasServices } from '../curtidas/index.service'
@Module({
  imports: [TypeOrmModule.forFeature([MinhasCurtidasEntity, IndexRepository, CurtidasModules, CurtidasServices]),CurtidasServices,CurtidasModules],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService, CurtidasModules, CurtidasServices]
})
export class IndexModule {}


