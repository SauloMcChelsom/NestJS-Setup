import {
    Version,
    Controller,
    Param,
    Body,
    Put,
    UseGuards, 
    UseInterceptors, 
    UseFilters 
} from '@nestjs/common'

import { hasRoles } from '@shared/decorator/roles.decorator'
import { JwtAuthAccessTokenGuard } from '@shared/guard/jwt-auth.guard'
import { RolesGuard } from '@shared/guard/roles.guard'
import { Role } from '@shared/enum/role.enum'
import { code } from '@shared/enum'
import { Error } from '@shared/response/error.response'
import { Success } from '@shared/response/success.response'
import { OK } from '@shared/response/ok'
 
import { UpdateRoleUserDTO } from './dto/user.dto'
import { RoleService } from './role.service'
import { RoleMapper } from './mapper/role.mapper'

@Controller('role')
export class RoleController {

    constructor(
        private service: RoleService,
        private toMapper:RoleMapper
    ) {}

    @Put(':id')
    @Version('1/private')
    @hasRoles(Role.ADMIN, Role.USER)
    @UseGuards(JwtAuthAccessTokenGuard, RolesGuard)
    @UseFilters(Error)
    @UseInterceptors(Success)
    public async updateRoleOfUser(@Param('id') id: string, @Body() role: UpdateRoleUserDTO) {
        await this.service.updateRoleOfUser(Number(id), role.role).then(() => this.toMapper.updateRole())
        return new OK([], code.SUCCESSFULLY_UPDATED, null, 0)
    }
}