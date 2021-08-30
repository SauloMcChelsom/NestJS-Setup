import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacaoEntity } from '../../entity/publicacao.entity';
import { IndexController } from './index.controller';
import { PublicacaoService } from './index.service';
import { IndexRepository } from './index.repository'
@Module({
  imports: [TypeOrmModule.forFeature([PublicacaoEntity, IndexRepository])],
  controllers: [IndexController],
  providers: [PublicacaoService],
  exports: [PublicacaoService]
})
export class PublicacaoModule {}


