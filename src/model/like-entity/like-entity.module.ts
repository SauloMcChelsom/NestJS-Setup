import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
import { PublicationEntityModule } from '@model/publication-entity/publication-entity.module'

import { LikeEntity } from '@entity/like.entity';

import { LikeEntityRepository } from './like-entity.repository';
import { LikeEntityModel } from './like-entity.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, LikeEntityRepository]),
    IsValidTimestampModule,
    PublicationEntityModule,
    EmptyModule
  ],
  controllers: [],
  providers: [LikeEntityModel],
  exports: [LikeEntityModel],
})
export class LikeEntityModule {}
