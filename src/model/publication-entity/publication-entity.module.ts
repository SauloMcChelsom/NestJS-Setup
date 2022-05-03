import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
import { PublicationEntity } from '@entity/publication.entity';

import { PublicationEntityRepository } from './publication-entity.repository';
import { PublicationEntityModel } from './publication-entity.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicationEntity, PublicationEntityRepository]),
    IsValidTimestampModule,
    EmptyModule
  ],
  controllers: [],
  providers: [PublicationEntityModel],
  exports: [PublicationEntityModel],
})
export class PublicationEntityModule {}
