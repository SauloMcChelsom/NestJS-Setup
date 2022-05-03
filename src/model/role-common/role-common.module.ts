import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'

import { UserEntity } from '@entity/user.entity';
import { RefreshTokenEntity } from '@entity/refresh-token.entity';

import { RoleCommonModel } from './role-common.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    UserEntityModule
  ],
  providers: [
    RoleCommonModel
  ],
  controllers: [],
  exports: [RoleCommonModel]
})
export class RolesModule {}
