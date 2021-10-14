import { Module } from '@nestjs/common'
import { FirebaseController } from './firebase.controller'
import { FirebaseService } from './firebase.service'
import { JwtUtilityModule } from '@shared/jwt/jwt.module'
import { FirebaseValidate } from './firebase.validate'
import { CheckUserExistsMapper } from './mapper/check-user-exists-by-email.mapper'

@Module({
  imports: [JwtUtilityModule],
  controllers: [FirebaseController],
  providers: [CheckUserExistsMapper, FirebaseValidate, FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}


