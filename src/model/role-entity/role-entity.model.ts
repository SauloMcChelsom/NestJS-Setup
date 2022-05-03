import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from '@shared/enum/role.enum'
import { UserEntity } from '@entity/user.entity'

@Injectable()
export class RoleEntityModel {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    public async updateRoleOfUser(id, role:Role){
        return await this.userRepository.update(id, {
            role:role
        }).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }
}