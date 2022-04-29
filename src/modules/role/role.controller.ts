import { Controller, Body, Param, Put, UseGuards } from '@nestjs/common'

import { hasRoles } from '@shared/decorator/roles.decorator'
import { JwtAuthGuard } from '@shared/guard/jwt-auth.guard'
import { RolesGuard } from '@shared/guard/roles.guard'
import { Role } from '@shared/enum/role.enum'
 
import { UpdateRoleUserDTO } from './dto/user.dto'
import { RoleService } from './role.service'
import { RoleMapper } from './mapper/role.mapper'

@Controller('role')
export class RoleController {

    constructor(
        private userService: RoleService,
        private toMapper:RoleMapper
    ) {}

    @hasRoles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    public async updateRoleOfUser(@Param('id') id: string, @Body() role: UpdateRoleUserDTO) {
        return await this.userService.updateRoleOfUser(Number(id), role.role).then(() => this.toMapper.updateRole())
    }
}