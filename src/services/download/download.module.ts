import { Module } from '@nestjs/common'
import { FirebaseModule } from '@modules/firebase/firebase.module'
import { UserModule } from '@modules/user/user.module'
import { DownloadController } from './download.controller'

@Module({
  imports: [
    UserModule,
    FirebaseModule
  ],
  controllers: [
    DownloadController
  ],
  providers: [],
  exports: []
})
export class DownloadModule {}


