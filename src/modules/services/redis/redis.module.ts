import { Module } from '@nestjs/common'
import { RedisController } from './redis.controller'
import { SendEmailModule } from '@root/src/lib/jobs/send-mail/send-mail.module'

@Module({
  imports: [
    SendEmailModule
  ],
  controllers: [
    RedisController
  ],
  providers: [],
  exports: []
})
export class RedisModule {}


