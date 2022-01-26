import { Module } from '@nestjs/common'
import { FirebaseController } from './firebase.controller'
import { FirebaseService } from './firebase.service'
import { JwtUtilityModule } from '@root/src/lib/jwt/jwt.module'
import { FirebaseModel } from './firebase.model'
import { CheckUserExistsMapper } from './mapper/check-user-exists-by-email.mapper'

@Module({
  imports: [JwtUtilityModule],
  controllers: [FirebaseController],
  providers: [CheckUserExistsMapper, FirebaseModel, FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}


