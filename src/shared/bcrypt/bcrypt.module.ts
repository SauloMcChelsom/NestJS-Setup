import { Module } from '@nestjs/common'
import { CryptUtilityService } from './bcrypt.service'

@Module({
  imports: [],
  providers: [CryptUtilityService],
  exports: [CryptUtilityService]
})
export class CryptUtilityModule {}
