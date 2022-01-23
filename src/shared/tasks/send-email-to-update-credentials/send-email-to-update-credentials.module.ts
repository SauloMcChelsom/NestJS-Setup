import { Module } from '@nestjs/common'
import { SendEmailUpdateCredentialsService } from './send-email-to-update-credentials.service'

@Module({
  imports: [],
  providers: [SendEmailUpdateCredentialsService],
  exports: [SendEmailUpdateCredentialsService]
})
export class SendEmailUpdateCredentialsModule {}
