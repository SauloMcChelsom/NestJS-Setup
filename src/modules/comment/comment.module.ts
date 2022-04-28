import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
import { UserModule } from '@modules/user/user.module';
import { PublicationModule } from '@modules/publication/publication.module';

import { CommentEntity } from '@entity/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentModel } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CommentMapper } from './mapper/index.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, CommentRepository]),
    UserModule,
    IsValidTimestampModule,
    EmptyModule,
    FirebaseModule,
    PublicationModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentModel,
    CommentMapper
  ],
  exports: [CommentService],
})
export class CommentModule {}
