import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { code, message } from '@root/src/shared/enum'

import { Role } from '@shared/enum/role.enum'
import { UserEntity } from '@entity/user.entity'

@Injectable()
export class RoleEntityModel {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  public async updateRoleOfUser(id, role:Role) {
    try {
      const res = await this.userRepository.update(id, { role:role }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : `${err.detail || err.hint || err.routine}`,
        }, HttpStatus.BAD_REQUEST)
      });

      if(!res){
        throw new HttpException({
          code : code.NOT_FOUND,
          message : 'update, id not found',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      if (res.affected == 1) {
        return {
          code : code.SUCCESSFULLY_UPDATED,
          message : 'update with sucess',
          description : ''
        };
      }

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
}