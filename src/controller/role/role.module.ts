import { Module } from '@nestjs/common';

import { RolesModule } from '@model/roles/role.module'
import { UsersModule } from "@model/users/user.module"

import { RoleController } from './role.controller';
import { RoleService } from './role.service'
import { RoleMapper } from './mapper/role.mapper'

@Module({
  imports: [
    RolesModule,
    UsersModule
  ],
  providers: [
    RoleService, 
    RoleMapper
  ],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
