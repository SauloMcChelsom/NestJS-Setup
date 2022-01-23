import { Module } from '@nestjs/common'
import { ExportEmailExcelModule } from './export-email-to-excel/export-email-to-excel.module'
import { SendEmailUpdateCredentialsModule } from './send-email-to-update-credentials/send-email-to-update-credentials.module'

@Module({
  imports: [
    ExportEmailExcelModule,
    SendEmailUpdateCredentialsModule
  ],
  providers: [],
  exports: []
})
export class TasksModule {}
