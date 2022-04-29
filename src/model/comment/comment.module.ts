import { Module } from '@nestjs/common';
import { CommentModel } from './comment.model';

@Module({
  imports: [],
  providers: [CommentModel],
  exports: [CommentModel],
})
export class CommentModule {}