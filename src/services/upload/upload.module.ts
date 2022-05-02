import { Module } from '@nestjs/common';
//import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@root/src/controller/user/user.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [UserModule],
  controllers: [UploadController],
  providers: [],
  exports: [],
})
export class UploadModule {}
