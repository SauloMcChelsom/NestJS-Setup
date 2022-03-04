import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserSeniorEntity } from '@entity/user.senior.entity'

import { SeniorController } from './senior.controller'
import { SeniorService } from './senior.service'
import { SeniorModel } from './senior.model'
import { SeniorRepository } from './senior.repository'
import { CheckInRepository } from './senior.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSeniorEntity, SeniorRepository, CheckInRepository]), 
  ],
  controllers: [SeniorController],
  providers: [
    SeniorService, 
    SeniorModel
  ],
  exports: [SeniorService]
})
export class SeniorModule {}


