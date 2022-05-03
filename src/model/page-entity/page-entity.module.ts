import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module'
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module'
import { PageEntity } from '@entity/page.entity'

import { PageEntityModel } from './page-entity.model'
import { PageEntityRepository } from './page-entity.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([PageEntity, PageEntityRepository]),
    IsValidTimestampModule,
    EmptyModule
  ],
  controllers: [],
  providers: [PageEntityModel],
  exports: [PageEntityModel],
})
export class PageEntityModule {}
