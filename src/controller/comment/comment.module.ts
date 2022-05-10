import { Module } from '@nestjs/common';

import { PublicationEntityModule } from '@model/publication-entity/publication-entity.module'
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
    UserEntityModule,
    PublicationEntityModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentMapper
  ],
  exports: [CommentService],
})
export class CommentModule {}
