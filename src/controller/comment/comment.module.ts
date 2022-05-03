import { Module } from '@nestjs/common';

//import { PublicationModule } from '@modules/publication/publication.module';
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module';

import { CommentCommonModule } from '@root/src/model/comment-common/comment-common.module';
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentMapper } from './mapper/index.mapper';


@Module({
  imports: [
    JwtLocalModule,
    CommentCommonModule,
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
