import { Module } from '@nestjs/common'
import { SendMailService } from './send-mail.service'
import { SendEmailModule } from '@shared/jobs/send-mail/send-mail.module'

@Module({
  imports: [SendEmailModule],
  providers: [SendMailService],
  exports: [SendMailService]
})
export class SendMailModule {}
