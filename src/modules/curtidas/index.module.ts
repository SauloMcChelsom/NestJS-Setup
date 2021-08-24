import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurtidasEntity } from '../../entity/curtidas.entity';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { IndexRepository } from './index.repository'
@Module({
  imports: [TypeOrmModule.forFeature([CurtidasEntity, IndexRepository])],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService]
})
export class IndexModule {}


