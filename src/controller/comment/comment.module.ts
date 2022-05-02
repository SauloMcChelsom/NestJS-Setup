import { Module } from '@nestjs/common';

//import { PublicationModule } from '@modules/publication/publication.module';
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module';

import { CommentModule as CommentsModule } from '@root/src/model/comment-common/comment-common.module';
import { UsersModule } from '@root/src/model/user-common/user-common.module'

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentMapper } from './mapper/index.mapper';


@Module({
  imports: [
    JwtLocalModule,
    CommentsModule,
    UsersModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentMapper
  ],
  exports: [CommentService],
})
export class CommentModule {}
