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

import { TasksModule } from '@root/src/lib/tasks/tasks.module';
import { JobsModule } from '@root/src/lib/jobs/jobs.module';
import { EventModule } from '@root/src/lib/events/events.module';
import { ServicesModule } from '@root/src/services/services.module';
import { AxiosModule } from '@root/src/lib/axios/axios.module';

import { CommentModule } from '@modules/comment/comment.module';
import { FirebaseModule } from '@modules/firebase/firebase.module';
import { ViewsModule } from '@root/src/views/views.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { FollowModule } from '@root/src/modules/follow/follow.module';
import { PublicationModule } from '@modules/publication/publication.module';
import { LikeModule } from '@modules/like/like.module';
import { SeniorModule } from '@modules/senior/senior.module';

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
      limit: 10,
    }),
    TasksModule,
    JobsModule,
    EventModule,
    AxiosModule,
    ServicesModule,
    FirebaseModule,
    ViewsModule,
    UserModule,
    PageModule,
    FollowModule,
    PublicationModule,
    LikeModule,
    CommentModule,
    SeniorModule,
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
