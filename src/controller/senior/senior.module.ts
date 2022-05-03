import { Module } from '@nestjs/common'
import { SeniorEntityModule } from '@model/senior-entity/senior-entity.module'
import { SeniorController } from './senior.controller'
import { SeniorService } from './senior.service'

@Module({
  imports: [
    SeniorEntityModule
  ],
  controllers: [SeniorController],
  providers: [ SeniorService],
  exports: [SeniorService]
})
export class SeniorModule {}


