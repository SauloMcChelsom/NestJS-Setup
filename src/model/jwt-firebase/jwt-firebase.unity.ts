import { Injectable, HttpException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { code } from '@root/src/shared/enum';

@Injectable()
export class JwtFirebaseUnity {
  public async isToken(token: string) {
    try {
      if (token == '' || token == null) {
        throw 'TOKEN_IS_NULL';
      }

      if (token.startsWith('Bearer ') == !true) {
        throw 'NOT_BEARER';
      }

      if (token.length <= 84) {
        throw 'SMALL_TOKEN';
      }

      if (token.indexOf('.') == -1) {
        throw 'TOKEN_MISSING_SPECIAL_CHARACTER';
      }

      return token.replace('Bearer ', '');
    } catch (error) {
      if (error == 'TOKEN_IS_NULL') {
        throw new HttpException(code.TOKEN_IS_NULL, 404);
      }
      if (error == 'NOT_BEARER') {
        throw new HttpException(code.NOT_BEARER, 404);
      }
      if (error == 'SMALL_TOKEN') {
        throw new HttpException(code.SMALL_TOKEN, 404);
      }
      if (error == 'TOKEN_MISSING_SPECIAL_CHARACTER') {
        throw new HttpException(code.TOKEN_MISSING_SPECIAL_CHARACTER, 404);
      }
      throw new HttpException(code.ERROR_GENERIC, 500);
    }
  }

  public async validateTokenByFirebase(token: string) {
    try {
      const decodedToken = await firebase.auth().verifyIdToken(token, true);

      if (decodedToken.uid) {
        return decodedToken;
      }

      throw decodedToken;
    } catch (error: any) {
      if (error.code) {
        throw new HttpException(error.message, 409);
      }
      throw new HttpException(code.ERROR_GENERIC, 500);
    }
  }

  public async revokeRefreshTokens(uid: string) {
    try {
      const revoke = await firebase
        .auth()
        .revokeRefreshTokens(uid)
        .then(() => true);
      if (revoke) {
        return revoke;
      }
      throw revoke;
    } catch (error: any) {
      if (error.code) {
        throw new HttpException(
          ['revoke_refresh_tokens'.toUpperCase(), error.message],
          error.code,
        );
      }
      throw new HttpException(code.ERROR_GENERIC, 500);
    }
  }

  public async getUserByUid(uid: string) {
    try {
      const user = await firebase.auth().getUser(uid);
      if (user) {
        return user.toJSON();
      }
      throw user;
    } catch (error: any) {
      if (error.code) {
        throw new HttpException(
          ['get_user'.toUpperCase(), error.message],
          error.code,
        );
      }
      throw new HttpException(code.ERROR_GENERIC, 500);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await firebase.auth().getUserByEmail(email);
      if (user) {
        return user.toJSON();
      }
      throw user;
    } catch (error: any) {
      if (error.code) {
        throw new HttpException(
          ['get_user_by_email'.toUpperCase(), error.message],
          error.code,
        );
      }
      throw new HttpException(code.ERROR_GENERIC, 500);
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
      throw true;
    } catch (error) {
      if (error == true) {
        throw new HttpException(code.NOT_FOUND_USER, 404);
      }
      throw new HttpException(code.ERROR_GENERIC, 500);
    }
  }
}
