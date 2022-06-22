import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { User } from '@shared/interfaces/user.interface';

@Injectable()
export class SendEmailService {
  constructor(@InjectQueue('send-mail') private queue: Queue) {}

  async sendMail(user: User) {
    await this.queue.add('send-mail-job', user);
  }
}
