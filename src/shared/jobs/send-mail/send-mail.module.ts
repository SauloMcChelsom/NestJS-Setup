import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { SendMailComponent } from './send-mail.component'
import { SendEmailService } from './send-mail.service'

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-mail'
    }),
  ],
  providers: [
    SendMailComponent,
    SendEmailService
  ],
  exports:[
    SendEmailService
  ]
})
export class SendEmailModule {}