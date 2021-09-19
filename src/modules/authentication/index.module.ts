import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { IndexController } from './index.controller'
import { IndexService } from './index.service'
import { IndexRepository } from './index.repository'
import { JwtUtilityModule } from '../../shared/jwt/jwt.utility.module'

@Module({
  imports: [JwtUtilityModule, TypeOrmModule.forFeature([PageEntity, IndexRepository])],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService]
})
export class IndexModule {}


