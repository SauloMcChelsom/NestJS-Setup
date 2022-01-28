import { Module } from '@nestjs/common'
import { UploadModule } from './upload/upload.module'
import { StreamModule } from './stream/stream.module'
import { RedisModule } from './redis/redis.module'
import { EvenstModule } from './events/events.module'

@Module({
  imports: [
    UploadModule,
    StreamModule,
    RedisModule,
    EvenstModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class ServicesModule {}