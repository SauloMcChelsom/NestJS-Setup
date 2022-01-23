import { Module } from '@nestjs/common'
import { ExportEmailExcelModule } from './export-email-to-excel/export-email-to-excel.module'

@Module({
  imports: [ExportEmailExcelModule],
  providers: [],
  exports: []
})
export class TasksModule {}
