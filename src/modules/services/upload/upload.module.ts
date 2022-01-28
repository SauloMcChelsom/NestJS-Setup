import { Module } from '@nestjs/common'
import { FirebaseModule } from '@modules/firebase/firebase.module'
import { UserModule } from '@modules/user/user.module'
import { UploadController } from './upload.controller'

@Module({
  imports: [
    UserModule,
    FirebaseModule
  ],
  controllers: [
    UploadController
  ],
  providers: [],
  exports: []
})
export class UploadModule {}


