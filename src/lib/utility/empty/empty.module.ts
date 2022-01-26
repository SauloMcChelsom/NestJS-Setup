import { Module } from '@nestjs/common'
import { EmptyService } from './empty.service'


@Module({
  imports: [],
  providers: [EmptyService],
  exports: [EmptyService]
})
export class EmptyModule {}
