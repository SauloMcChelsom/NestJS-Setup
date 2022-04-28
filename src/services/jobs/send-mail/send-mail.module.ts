import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendMailComponent } from './send-mail.component';
import { SendEmailService } from './send-mail.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'send-mail',
    }),
  ],
  providers: [SendMailComponent, SendEmailService],
  exports: [SendEmailService],
})
export class SendEmailModule {}
