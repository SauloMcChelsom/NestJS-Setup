import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserSeniorEntity } from '@entity/senior/user.senior.entity'
import { CheckInSeniorEntity } from '@entity/senior/check-in.senior.entity'

import { SeniorEntityModel } from './senior-entity.model'
import { CheckInSeniorEntityRepository } from './senior-entity.repository'
import { UserSeniorEntityRepository } from './senior-entity.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSeniorEntity, 
      CheckInSeniorEntity, 
      CheckInSeniorEntityRepository, 
      UserSeniorEntityRepository
    ]), 
  ],
  controllers: [],
  providers: [SeniorEntityModel],
  exports: [SeniorEntityModel]
})
export class SeniorEntityModule {}


