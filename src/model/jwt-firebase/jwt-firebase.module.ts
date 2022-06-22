import { Module } from '@nestjs/common'
import { JwtFirebaseModel } from './jwt-firebase.model'
import { JwtFirebaseUnity } from './jwt-firebase.unity'

@Module({
  imports: [],
  controllers: [],
  providers: [JwtFirebaseModel, JwtFirebaseUnity],
  exports: [JwtFirebaseModel],
})
export class JwtFirebaseModule {}
