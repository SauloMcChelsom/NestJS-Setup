import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@root/src/controller/auth/auth.module';
import { UserModule } from '@root/src/controller/user/user.module'

import { UserEntity } from '@entity/user.entity';
import { RefreshTokenEntity } from '@entity/refresh-token.entity';

import { RoleModel } from './role.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    AuthModule,
    UserModule
  ],
  providers: [
    RoleModel
  ],
  controllers: [],
  exports: [RoleModel]
})
export class RolesModule {}
