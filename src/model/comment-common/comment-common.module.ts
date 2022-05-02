import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
//import { PublicationModule } from '@modules/publication/publication.module';

import { CommentEntity } from '@entity/comment.entity';
import { CommentCommonModel } from './comment-common.model';
import { CommentCommonRepository } from './comment-common.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, CommentCommonRepository]),
    IsValidTimestampModule,
    EmptyModule,
    //PublicationModule
  ],
  controllers: [],
  providers: [CommentCommonModel],
  exports: [CommentCommonModel],
})
export class CommentCommonModule {}
