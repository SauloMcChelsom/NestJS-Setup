import { Injectable } from '@nestjs/common';

@Injectable()
export class EmptyService {
  public run(e: any) {
    e = typeof e == 'string' ? e.trim() : e;
    switch (e) {
      case '':
      case 0:
      case '0':
      case null:
      case 'null':
      case false:
      case 'false':
      case undefined:
      case 'undefined':
      case typeof e == 'undefined':
        return true;
      default:
        return false;
    }
  }
}
