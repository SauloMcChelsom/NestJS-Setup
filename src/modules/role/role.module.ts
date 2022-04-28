import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module'

import { UserEntity } from '../../entity/user.entity';
import { RefreshTokenEntity } from '../../entity/refresh-token.entity';

import { RoleMapper } from './mapper/role.mapper'
import { RoleModel } from './role.model'
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    AuthModule,
    UserModule
  ],
  providers: [
    RoleService, 
    RoleModel, 
    RoleMapper
  ],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
