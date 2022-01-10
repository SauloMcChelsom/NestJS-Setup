import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@modules/user/user.module';
/*import { PageModule } from '@modules/page/page.module';
import { FollowModule } from '@root/src/modules/follow/follow.module';
import { PublicationModule } from '@modules/publication/publication.module';
import { LikeModule } from '@modules/like/like.module';*/
import { CommentModule } from '@modules/comment/comment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'production'}`,
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRoot(),
    FirebaseModule,
    UserModule,
    /*PageModule,
    FollowModule,
    PublicationModule,
    LikeModule,*/
    CommentModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}