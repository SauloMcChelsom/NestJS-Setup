import { Module } from '@nestjs/common'
import { ExportEmailExcelService } from './export-email-to-excel.service'

@Module({
  imports: [],
  providers: [ExportEmailExcelService],
  exports: [ExportEmailExcelService]
})
export class ExportEmailExcelModule {}
