import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    async createToken(user: any) {
        // Deconstruct the properties
        const { id, email, dateOfBirth, firstName, lastName } =  user

        // Encode that into a JWT
        return {
            access_token: this.jwtService.sign({
                sub: id,
                email, dateOfBirth, firstName, lastName,
            }),
        }
    }

}
