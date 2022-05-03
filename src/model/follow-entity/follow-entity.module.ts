import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageEntityModule } from '@model/page-entity/page-entity.module'
import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { PageEntity } from '@entity/page.entity';

import { FollowEntityRepository } from './follow-entity.repository';
import { FollowEntityModel } from './follow-entity.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([PageEntity, FollowEntityRepository]),
    IsValidTimestampModule,
    EmptyModule,
    PageEntityModule
  ],
  controllers: [],
  providers: [FollowEntityModel],
  exports: [FollowEntityModel],
})
export class FollowEntityModule {}
