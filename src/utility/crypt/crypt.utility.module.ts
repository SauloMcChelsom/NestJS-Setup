import { Module } from '@nestjs/common'
import { CryptUtilityService } from './crypt.utility.service'

@Module({
  imports: [],
  providers: [CryptUtilityService],
  exports: [CryptUtilityService]
})
export class CryptUtilityModule {}
