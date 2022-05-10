import { Module } from '@nestjs/common'
import { FirebaseController } from './firebase.controller'
import { FirebaseService } from './firebase.service'
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module'
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'
import { JwtFirebaseModule } from '@root/src/model/jwt-firebase/jwt-firebase.module'
import { FirebaseMapper } from './mapper/index.mapper'

@Module({
  imports: [JwtLocalModule, UserEntityModule, JwtFirebaseModule],
  controllers: [FirebaseController],
  providers: [FirebaseService, FirebaseMapper],
  exports: [FirebaseService],
})
export class FirebaseModule {}
