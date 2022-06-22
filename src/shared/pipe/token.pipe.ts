import { Injectable, PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UID implements PipeTransform {
  transform(token: any) {
    const jwt = token.replace('Bearer ', '');

    const { user } = new JwtService(null).decode(jwt, { json: true }) as {
      user
    };

    return user.uid;
  }
}
