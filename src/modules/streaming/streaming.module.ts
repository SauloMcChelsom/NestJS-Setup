import { Module } from '@nestjs/common'

import { FirebaseModule } from '@modules/firebase/firebase.module'
import { UserModule } from '@modules/user/user.module'

import { StreamingController } from './streaming.controller'
import { StreamingService } from './streaming.service'


@Module({
  imports: [
    UserModule,
    FirebaseModule
  ],
  controllers: [StreamingController],
  providers: [
    StreamingService
  ],
  exports: [StreamingService]
})
export class StreamingModule {}


