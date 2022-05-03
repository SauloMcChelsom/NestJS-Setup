import { Module } from '@nestjs/common';

import { RolesModule } from '@root/src/model/role-common/role-common.module'
import { UserEntityModule } from "@root/src/model/user-entity/user-entity.module"

import { RoleController } from './role.controller';
import { RoleService } from './role.service'
import { RoleMapper } from './mapper/role.mapper'

@Module({
  imports: [
    RolesModule,
    UserEntityModule
  ],
  providers: [
    RoleService, 
    RoleMapper
  ],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
