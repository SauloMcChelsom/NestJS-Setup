import { Injectable } from '@nestjs/common';

import { FirebaseService } from '@modules/firebase/firebase.service';

import { UserModel } from './user.model';
import {
  CreateInterface,
  UpdateInterface,
  UpdateUserUidWithFirebaseUidInterface as UpdateUID,
} from './interface';

@Injectable()
export class UserService {
  constructor(
    private model: UserModel,
    private firebase: FirebaseService
  ) {}

  public async create(body: CreateInterface) {
    await this.model.emailAlreadyExist(body.email);
    await this.model.uidAlreadyExist(body.uid);
    await this.model.providersIsValid(body.providers);
    body.password = await this.model.hashPassword(body.password);
    return await this.model.create(body);
  }

  public async authFindOneByUid(uid: string) {
    return await this.model.getUserByUid(uid);
  }

  public async publicFindOneByUid(uid: string) {
    return await this.model.getUserByUid(uid);
  }

  public async authFindOneByEmail(email: string) {
    return await this.model.getUserByEmail(email);
  }

  public async publicFindOneByEmail(email: string) {
    return await this.model.getUserByEmail(email);
  }

  public async updateByUid(uid: string, body: UpdateInterface) {
    const { id } = await this.model.getUserByUid(uid);
    await this.model.updateUserByUid(id, body);
    return await this.model.getUserByUid(uid);
  }

  public async updateUserUidWithFirebaseUid(uid: string, body: UpdateUID) {
    const { id } = await this.model.getUserByUid(uid);
    await this.model.updateUserByUid(id, body);
    return await this.model.getUserByUid(body.uid);
  }

  public async deleteByUid(uid: string) {
    const { id } = await this.model.getUserByUid(uid);
    await this.firebase.revokeRefreshTokens(uid);
    await this.firebase.deleteUser(uid);
    await this.model.delete(id);
  }

  public async getUserByUid(uid: string) {
    return await this.model.getUserByUid(uid);
  }
}
