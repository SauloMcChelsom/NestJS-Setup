import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { PageSegmentsModule } from '@modules/page-segments/page-segments.module';
import { PublicationModule } from '@modules/publication/publication.module';
import { LikeModule } from '@modules/like/like.module';
import { CommentModule } from '@modules/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FirebaseModule,
    UserModule,
    PageModule,
    PageSegmentsModule,
    PublicationModule,
    LikeModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
