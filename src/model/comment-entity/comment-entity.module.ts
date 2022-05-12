import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { CommentEntity } from '@entity/comment.entity';
import { CommentEntityModel } from './comment-entity.model';
import { CommentEntityRepository } from './comment-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, CommentEntityRepository]),
    IsValidTimestampModule,
    EmptyModule,
  ],
  controllers: [],
  providers: [CommentEntityModel],
  exports: [CommentEntityModel],
})
export class CommentEntityModule{}
