import { message, code as codes } from '@root/src/lib/enum';

export class OK {
  private results;
  private size;
  private description;
  private message;
  private code;
  private timestamp;
  private count;

  constructor(results: any[] = [], code: codes, description = '', count = 0) {
    this.results = results;
    this.code = code;
    this.description = description;
    this.count = count;
    this.message = message[code];
    this.timestamp = new Date();
  }
} 
