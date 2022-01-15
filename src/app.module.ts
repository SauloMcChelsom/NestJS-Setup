import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from '@modules/comment/comment.module';
import { FirebaseModule } from '@modules/firebase/firebase.module';
import { ViewsModule } from '@views/views.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { FollowModule } from '@root/src/modules/follow/follow.module';
import { PublicationModule } from '@modules/publication/publication.module';
import { LikeModule } from '@modules/like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'production'}`,
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRoot(),
    FirebaseModule,
    ViewsModule,
    UserModule,
    PageModule,
    FollowModule,
    PublicationModule,
    LikeModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}