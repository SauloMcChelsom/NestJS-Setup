import { Module } from '@nestjs/common';

//import { PublicationModule } from '@modules/publication/publication.module';
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module';

import { CommentEntityModule } from '@root/src/model/comment-entity/comment-entity.module';
import { 
UserEntityModule } from '@root/src/model/user-entity/user-entity.module'

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentMapper } from './mapper/index.mapper';


@Module({
  imports: [
    JwtLocalModule,
    CommentEntityModule,
    UserEntityModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentMapper
  ],
  exports: [CommentService],
})
export class CommentModule {}
