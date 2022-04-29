import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { DownloadController } from './download.controller';

@Module({
  imports: [UserModule],
  controllers: [DownloadController],
  providers: [],
  exports: [],
})
export class DownloadModule {}
