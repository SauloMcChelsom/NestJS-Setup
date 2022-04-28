import { Injectable } from '@nestjs/common';
import { Role } from 'src/shared/enum/role.enum';
import { RoleModel } from './role.model';

@Injectable()
export class RoleService {

    constructor(private model: RoleModel){}

    public async updateRoleOfUser(id: number, role: Role) {
        await this.model.updateRoleOfUser(id,role)
    }
}