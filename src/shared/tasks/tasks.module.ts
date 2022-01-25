import { Module } from '@nestjs/common'
import { SendMailModule } from './send-mail.monday_to_fridat_at_11_30am/send-mail.module'
@Module({
  imports: [
    SendMailModule
  ],
  providers: [],
  exports: []
})
export class TasksModule {}
