import { Module } from '@nestjs/common';

import { RolesModule } from '@model/roles/role.module'
import { UserModule } from '@root/src/controller/user/user.module'

import { RoleController } from './role.controller';
import { RoleService } from './role.service'
import { RoleMapper } from './mapper/role.mapper'

@Module({
  imports: [
    RolesModule,
    UserModule
  ],
  providers: [
    RoleService, 
    RoleMapper
  ],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
