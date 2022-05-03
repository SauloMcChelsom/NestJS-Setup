import { Injectable } from '@nestjs/common';

import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model';


@Injectable()
export class UserService {

  constructor(private userModel: UserEntityModel) {}

  public async findOneUsertByUid(uid: string) {
    return await this.userModel.getUserByUid(uid);
  }

  public async findOneUserByEmail(email: string) {
    return await this.userModel.getUserByEmail(email);
  }

  public async findOneUserById(id: number) {
    return await this.userModel.findOneUserById(id)
  }

  public async findAll() {
    return await this.userModel.findAll()
  }

}
