import { Module } from '@nestjs/common';
import { DownloadController } from './download.controller';

@Module({
  imports: [],
  controllers: [DownloadController],
  providers: [],
  exports: [],
})
export class DownloadModule {}
