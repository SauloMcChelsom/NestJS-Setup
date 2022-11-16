import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { QuestionEntity } from '@entity/question.entity';
import { QuestionEntityModel } from './question-entity.model';
import { QuestionEntityRepository } from './question-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, QuestionEntityRepository]),
    IsValidTimestampModule,
    EmptyModule,
  ],
  controllers: [],
  providers: [QuestionEntityModel],
  exports: [QuestionEntityModel],
})
export class QuestionEntityModule{}
