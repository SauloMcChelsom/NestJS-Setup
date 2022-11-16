import { CacheModule, CacheInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { TasksModule } from '@services/tasks/tasks.module';
import { JobsModule } from '@services/jobs/jobs.module';
import { EventsModule } from '@services/events/events.module';
import { ServicesModule } from '@services/services.module';
import { AxiosModule } from '@services/axios/axios.module';

import { ViewsModule } from '@root/src/views/views.module';

import { UserModule } from '@controller/user/user.module';
import { PageModule } from '@controller/page/page.module';
import { FollowModule } from '@controller/follow/follow.module';
import { PublicationModule } from '@controller/publication/publication.module';
import { LikeModule } from '@controller/like/like.module';
import { FirebaseModule } from '@controller/firebase/firebase.module'
import { AuthModule } from '@controller/auth/auth.module'
import { RoleModule } from '@controller/role/role.module'
import { CommentModule } from '@controller/comment/comment.module';
import { QuizModule } from '@controller/quiz/quiz.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 0.1, // seconds
      max: 15, // maximum number of items in cache
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: false,
      expandVariables: true,
      ignoreEnvFile: false,
      cache: true,
    }),
    TypeOrmModule.forRoot(),
    BullModule.forRootAsync({ 
      useFactory: () => {
        const REDIS_URL = {
          redis: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
            tls: {
              rejectUnauthorized: false,
            },
          },
        };
      
        const env = process.env.environment;
      
        if (env === 'development' || env === 'tests') {
          delete REDIS_URL.redis.tls;
          delete REDIS_URL.redis.password;
        }
      
        return REDIS_URL;
      }
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    MulterModule.register( {
      dest: './CDN',
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,//Limitação de taxa por click
    }),
    TasksModule,
    JobsModule,
    EventsModule,
    AxiosModule,
    ServicesModule,
    ViewsModule,
    UserModule,
    PageModule,
    FollowModule,
    PublicationModule,
    LikeModule,
    CommentModule,
    QuizModule,
    AuthModule,
    FirebaseModule,
    RoleModule
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
