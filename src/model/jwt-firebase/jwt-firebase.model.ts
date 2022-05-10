import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { code, message } from '@root/src/shared/enum';
import { JwtFirebaseUnity } from './jwt-firebase.unity';

@Injectable()
export class JwtFirebaseModel {
  constructor(private model: JwtFirebaseUnity) {}

  public async verifyToken(token: string) {
    const body = await this.model.isToken(token);
    return await this.model.validateTokenByFirebase(body);
  }

  public async findUserByUid(token: string) {
    const body = await this.model.isToken(token);
    const decoded = await this.model.validateTokenByFirebase(body)
    return decoded
  }

  public async revokeRefreshTokens(token: string) {
    const body = await this.model.isToken(token);
    const decoded = await this.model.validateTokenByFirebase(body);
    return this.model.revokeRefreshTokens(decoded.uid);
  }

  public async getUserByEmail(email: string, token: string) {
    const body = await this.model.isToken(token);
    const decoded = await this.model.validateTokenByFirebase(body);
    if (decoded.email != email) {
      throw new HttpException({
        code : code.EMAIL_INVALID,
        message : message.EMAIL_INVALID,
        description : message.EMAIL_INVALID_CONFLICT_TOKEN_DESCRIPTION,
      }, HttpStatus.CONFLICT)
    }
    return await this.model.getUserByEmail(email);
  }

  public async getUserByUid(uid: string, token: string) {
    const body = await this.model.isToken(token);
    const decoded = await this.model.validateTokenByFirebase(body);

    if (decoded.uid != uid) {
      throw new HttpException({
        code : code.UID_INVALID,
        message : message.UID_INVALID,
        description : message.UID_INVALID_CONFLICT_TOKEN_DESCRIPTION,
      }, HttpStatus.CONFLICT)
    }
    return await this.model.getUserByUid(uid);
  }

  public async userDisplayByEmail(email: string) {
    return await this.model.getUserByEmail(email);
  }

  public async deleteUser(token: string) {
    const body = await this.model.isToken(token);
    const decoded = await this.model.validateTokenByFirebase(body);
    await this.model.deleteUser(decoded.uid);
    return true;
  }

  public async validateTokenByFirebase(token: string) {
    const body = await this.model.isToken(token);
    return await this.model.validateTokenByFirebase(body);
  }
}
