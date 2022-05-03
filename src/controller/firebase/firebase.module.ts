import { Module } from '@nestjs/common'
import { FirebaseController } from './firebase.controller'
import { FirebaseService } from './firebase.service'
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module'
import { UserCommonModule } from '@model/user-common/user-common.module'
import { JwtFirebaseModule } from '@model/jwt-firebase/firebase.module'
import { FirebaseMapper } from './mapper/index.mapper'

@Module({
  imports: [JwtLocalModule, UserCommonModule, JwtFirebaseModule],
  controllers: [FirebaseController],
  providers: [FirebaseService, FirebaseMapper],
  exports: [FirebaseService],
})
export class FirebaseModule {}
