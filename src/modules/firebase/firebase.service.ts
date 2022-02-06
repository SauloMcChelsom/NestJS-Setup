import { Injectable, HttpException } from '@nestjs/common';
import { code, message } from '@root/src/lib/enum';
import { FirebaseModel } from './firebase.model';

@Injectable()
export class FirebaseService {
  constructor(private model: FirebaseModel) {}

  public async verifyToken(token: string) {
    const body = await this.model.isToken(token);
    return await this.model.validateTokenByFirebase(body);
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
      return await new HttpException(
        [
          code.EMAIL_INVALID,
          message.EMAIL_INVALID,
          message.EMAIL_INVALID_CONFLICT_TOKEN_DESCRIPTION,
        ],
        500,
      );
    }
    return await this.model.getUserByEmail(email);
  }

  public async getUserByUid(uid: string, token: string) {
    const body = await this.model.isToken(token);
    const decoded = await this.model.validateTokenByFirebase(body);

    if (decoded.uid != uid) {
      return await new HttpException(
        [
          code.UID_INVALID,
          message.UID_INVALID,
          message.UID_INVALID_CONFLICT_TOKEN_DESCRIPTION,
        ],
        500,
      );
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
