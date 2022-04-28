import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare  } from 'bcryptjs';

import { code, message } from '@root/src/shared/enum';

import { UserRepository } from './user.repository';
import {
  UpdateInterface,
  UpdateUserUidWithFirebaseUidInterface as UpdateUID,
} from './interface';

export class UserModel {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  public async hashPassword(password: string) {
    return await hash(password, 12)
  }

  public async compare(textoLegivel: string, hash: string){
    return await compare(textoLegivel, hash)
  }

  public async emailAlreadyExist(email: string) {
    try {
      const res = await this.repository.findOne({ where: { email: email } });
      if (res) {
        throw new HttpException(code.EMAIL_ALREADY_IN_USE, 409);
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async uidAlreadyExist(uid: string) {
    try {
      const res = await this.repository.findOne({ where: { uid: uid } });
      if (res) {
        throw new HttpException(code.UID_ALREADY_IN_USE, 409);
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async providersIsValid(providers: string) {
    try {
      if (providers == 'google.com' || providers == 'email_password') {
        return;
      }
      throw new HttpException(
        [
          code.PROVIDERS_USER_IS_INVALID,
          message.PROVIDERS_USER_IS_INVALID,
          'usuario autenticou com o google.com ou email/senha? example: google ou email_password',
        ],
        400,
      );
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async getUserByUid(uid: string) {
    try {
      const res = await this.repository.findOne({ where: { uid: uid } });
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const res = await this.repository.findOne({ where: { email: email } });
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async updateUserByUid(id: number, body: UpdateInterface | UpdateUID) {
    try {
      const res = await this.repository.update(id, body);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async delete(id: number) {
    try {
      const res = await this.repository.delete(id);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async create(page: any) {
    try {
      const res = await this.repository.save(page);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
}
