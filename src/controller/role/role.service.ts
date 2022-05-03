import { Injectable } from '@nestjs/common';
import { Role } from 'src/shared/enum/role.enum';
import { RoleEntityModel } from '@root/src/model/role-entity/role-entity.model';

@Injectable()
export class RoleService {

    constructor(private model: RoleEntityModel){}

    public async updateRoleOfUser(id: number, role: Role) {
        await this.model.updateRoleOfUser(id,role)
    }
}