import { Module } from '@nestjs/common'
import { SendMailService } from './send-mail.service'

@Module({
  imports: [],
  providers: [SendMailService],
  exports: [SendMailService]
})
export class SendMailModule {}
