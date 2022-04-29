import { Module } from '@nestjs/common';
//import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@modules/user/user.module';
import { StreamController } from './stream.controller';

@Module({
  imports: [UserModule],
  controllers: [StreamController],
  providers: [],
  exports: [],
})
export class StreamModule {}
