import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { code, message } from '@root/src/shared/enum';

@Injectable()
export class JwtFirebaseUnity {
  public async isToken(token: string) {
    try {
      if (token == '' || token == null) {
        throw new HttpException({
          code : code.FIREBASE_FAILED,
          message : message.TOKEN_IS_NULL,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (token.startsWith('Bearer ') == !true) {
        throw new HttpException({
          code : code.FIREBASE_FAILED,
          message : message.NOT_BEARER,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (token.length <= 84) {
        throw new HttpException({
          code : code.FIREBASE_FAILED,
          message : message.SMALL_TOKEN,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (token.indexOf('.') == -1) {
        throw new HttpException({
          code : code.FIREBASE_FAILED,
          message : message.TOKEN_MISSING_SPECIAL_CHARACTER,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      return token.replace('Bearer ', '');
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async validateTokenByFirebase(token: string) {
    try {
      const decodedToken = await firebase.auth().verifyIdToken(token, true)

      if (decodedToken.uid) {
        return decodedToken;
      }

      throw new HttpException({
        code : code.FIREBASE_FAILED,
        message : 'failed in validate token by firebase',
        description : decodedToken
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async revokeRefreshTokens(uid: string) {
    try {
      const revoke = await firebase
        .auth()
        .revokeRefreshTokens(uid)
        .then(() => true)

      if (revoke) {
        return revoke;
      }

      throw new HttpException({
        code : code.FIREBASE_FAILED,
        message : 'failed in revoke refresh tokens',
        description : ''
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async getUserByUid(uid: string) {
    try {
      const user = await firebase.auth().getUser(uid);
      if (user) {
        return user.toJSON();
      }
      throw new HttpException({
        code : code.FIREBASE_FAILED,
        message : 'failed in find user by uid',
        description : ''
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await firebase.auth().getUserByEmail(email);
      
      if (user) {
        return user.toJSON();
      }

      throw new HttpException({
        code : code.FIREBASE_FAILED,
        message : 'failed in find user by email',
        description : ''
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async deleteUser(uid: string) {
    try {
      const deleted = await firebase
        .auth()
        .deleteUser(uid)
        .then(() => true);
      if (deleted) {
        return deleted;
      }
      throw new HttpException({
        code : code.FIREBASE_FAILED,
        message : 'failed in delete user',
        description : ''
      }, HttpStatus.CONFLICT)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }
}
