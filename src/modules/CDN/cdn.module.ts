import { Module } from '@nestjs/common'
import { UploadModule } from './upload/upload.module'
import { StreamModule } from './stream/stream.module'

@Module({
  imports: [
    UploadModule,
    StreamModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class ContentDeliveryNetworkModule {}