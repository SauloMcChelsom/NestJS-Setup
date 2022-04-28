import { Injectable, PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TOKEN implements PipeTransform {
  transform(token: any) {
    const jwt = token.replace('Bearer ', '');

    const { user_id } = new JwtService(null).decode(jwt, { json: true }) as {
      user_id: string;
    };

    return user_id;
  }
}

@Injectable()
export class UID implements PipeTransform {
  transform(token: any) {
    const jwt = token.replace('Bearer ', '');

    const { user_id } = new JwtService(null).decode(jwt, { json: true }) as {
      user_id: string;
    };

    return user_id;
  }
}
