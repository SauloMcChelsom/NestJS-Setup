import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'

import { UserEntity } from '@entity/user.entity';
import { RefreshTokenEntity } from '@entity/refresh-token.entity';

import { RoleEntityModel } from './role-entity.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    UserEntityModule
  ],
  providers: [
    RoleEntityModel
  ],
  controllers: [],
  exports: [RoleEntityModel]
})
export class RoleEntityModule {}
