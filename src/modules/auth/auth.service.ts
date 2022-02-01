import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private firebase:FirebaseService,
    private user:UserService
  ) {}

  async getuser(uid: string): Promise<any> {

    const user = await this.user.authFindOneByUid(uid);
    
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private decode(jwt: string):any{
    return this.jwtService.decode(jwt, { json: true }) as { uuid: string };
  }
  
}