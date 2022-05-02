import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
import { AuthorModule } from '@root/src/controller/author/author.module'
//import { PublicationModule } from '@modules/publication/publication.module';

import { CommentEntity } from '@entity/comment.entity';
import { CommentModel } from './comment.model';
import { CommentRepository } from './comment.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, CommentRepository]),
    IsValidTimestampModule,
    EmptyModule,
    //PublicationModule,
    AuthorModule
  ],
  controllers: [],
  providers: [CommentModel],
  exports: [CommentModel],
})
export class CommentModule {}
