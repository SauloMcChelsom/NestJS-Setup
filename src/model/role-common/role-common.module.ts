import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserCommonModule } from '@root/src/model/user-common/user-common.module'

import { UserEntity } from '@entity/user.entity';
import { RefreshTokenEntity } from '@entity/refresh-token.entity';

import { RoleCommonModel } from './role-common.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    UserCommonModule
  ],
  providers: [
    RoleCommonModel
  ],
  controllers: [],
  exports: [RoleCommonModel]
})
export class RolesModule {}
