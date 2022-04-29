import { Injectable } from '@nestjs/common';

import { UserModel } from '@model/users/user.model';
import {
  CreateInterface,
  UpdateInterface,
  UpdateUserUidWithFirebaseUidInterface as UpdateUID,
} from './interface';

@Injectable()
export class UserService {
  constructor(
    private userModel: UserModel
  ) {}

  public async create(body: CreateInterface) {
    await this.userModel.emailAlreadyExist(body.email);
    await this.userModel.uidAlreadyExist(body.uid);
    body.password = await this.userModel.hashPassword(body.password);
    return await this.userModel.create(body);
  }

  public async authFindOneByUid(uid: string) {
    return await this.userModel.getUserByUid(uid);
  }

  public async publicFindOneByUid(uid: string) {
    return await this.userModel.getUserByUid(uid);
  }

  public async authFindOneByEmail(email: string) {
    return await this.userModel.getUserByEmail(email);
  }

  public async publicFindOneByEmail(email: string) {
    return await this.userModel.getUserByEmail(email);
  }

  public async findOneUserById(id: number) {
    let user = await this.userModel.findOneUserById(id)
    const {password, ...result} = user;
    return result;
}

  public async updateByUid(uid: string, body: UpdateInterface) {
    const { id } = await this.userModel.getUserByUid(uid);
    await this.userModel.updateUserByUid(id, body);
    return await this.userModel.getUserByUid(uid);
  }

  public async updateUserUidWithFirebaseUid(uid: string, body: UpdateUID) {
    const { id } = await this.userModel.getUserByUid(uid);
    await this.userModel.updateUserByUid(id, body);
    return await this.userModel.getUserByUid(body.uid);
  }

  public async deleteByUid(uid: string) {
    const { id } = await this.userModel.getUserByUid(uid);
    //await this.firebase.revokeRefreshTokens(uid);
    //await this.firebase.deleteUser(uid);
    await this.userModel.delete(id);
  }

  public async getUserByUid(uid: string) {
    return await this.userModel.getUserByUid(uid);
  }
}
