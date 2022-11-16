import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { TitleEntity } from '@entity/title.entity';
import { TitleEntityModel } from './title-entity.model';
import { TitleEntityRepository } from './title-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TitleEntity, TitleEntityRepository]),
    IsValidTimestampModule,
    EmptyModule,
  ],
  controllers: [],
  providers: [TitleEntityModel],
  exports: [TitleEntityModel],
})
export class TitleEntityModule{}
