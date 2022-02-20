import { Module } from '@nestjs/common'
import { UploadModule } from './upload/upload.module'
import { StreamModule } from './stream/stream.module'
import { RedisModule } from './redis/redis.module'
import { EvenstModule } from './events/events.module'
import { DownloadModule } from './download/download.module'
import { ServerSentEventsModule } from './server-sent-events/server-sent-events.module'

@Module({
  imports: [
    UploadModule,
    StreamModule,
    RedisModule,
    EvenstModule,
    DownloadModule,
    ServerSentEventsModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class ServicesModule {}