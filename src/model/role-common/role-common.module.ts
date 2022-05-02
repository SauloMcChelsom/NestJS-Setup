import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@root/src/model/user-common/user-common.module'

import { UserEntity } from '@entity/user.entity';
import { RefreshTokenEntity } from '@entity/refresh-token.entity';

import { RoleModel } from './role-common.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    UsersModule
  ],
  providers: [
    RoleModel
  ],
  controllers: [],
  exports: [RoleModel]
})
export class RolesModule {}
