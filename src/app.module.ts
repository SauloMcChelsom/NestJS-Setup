import { CacheModule, CacheInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

import * as option from '@conf/options/options.conf'
import { TasksModule } from '@root/src/lib/tasks/tasks.module'
import { JobsModule } from '@root/src/lib/jobs/jobs.module'
import { EventModule } from '@root/src/lib/events/events.module'


import { CommentModule } from '@modules/comment/comment.module';
import { FirebaseModule } from '@modules/firebase/firebase.module';
import { ViewsModule } from '@root/src/views/views.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { FollowModule } from '@root/src/modules/follow/follow.module';
import { PublicationModule } from '@modules/publication/publication.module';
import { LikeModule } from '@modules/like/like.module';
import { StreamingModule } from '@modules/streaming/streaming.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register(option.cache()),
    ConfigModule.forRoot(option.typeorm()),
    TypeOrmModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: () => (option.redis()),
    }),
    EventEmitterModule.forRoot(option.eventEmitter()),
    MulterModule.register({
      dest: './files',
    }),
    TasksModule,
    JobsModule,
    EventModule,
    FirebaseModule,
    ViewsModule,
    UserModule,
    PageModule,
    FollowModule,
    PublicationModule,
    LikeModule,
    CommentModule,
    StreamingModule
  ],
  controllers: [],
  providers: [
    /**
     * Para reduzir a quantidade de clichê necessária, 
     * você pode vincular CacheInterceptora todos os endpoints globalmente
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}



