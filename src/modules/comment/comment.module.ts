import { Module } from '@nestjs/common';

//import { PublicationModule } from '@modules/publication/publication.module';
import { AuthorModule } from '@modules/author/author.module'
import { UserModule } from '@modules/user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentModule as CommentsModule } from '@model/comment/comment.module';
import { CommentMapper } from './mapper/index.mapper';

@Module({
  imports: [
    AuthorModule,
    CommentsModule,
    UserModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentMapper
  ],
  exports: [CommentService],
})
export class CommentModule {}
