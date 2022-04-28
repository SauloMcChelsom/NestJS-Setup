import { Module } from '@nestjs/common';
import { SendEmailModule } from './send-mail/send-mail.module';

@Module({
  imports: [SendEmailModule],
  providers: [],
  exports: [],
})
export class JobsModule {}
