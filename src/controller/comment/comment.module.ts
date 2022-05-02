import { Module } from '@nestjs/common';

//import { PublicationModule } from '@modules/publication/publication.module';
import { AuthModule } from '@root/src/controller/auth/auth.module'
import { UserModule } from '@root/src/controller/user/user.module';

import { CommentModule as CommentsModule } from '@model/comment/comment.module';
import { UsersModule } from '@model/users/user.module'

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentMapper } from './mapper/index.mapper';


@Module({
  imports: [
    AuthModule,
    CommentsModule,
    UserModule,
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
