import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateDto } from '@modules/user/dto/create.dto'

@Injectable()
export class SendEmailService {
    constructor(@InjectQueue('send-mail') private queue: Queue){}

    async sendMail(user:CreateDto){
        await this.queue.add('send-mail-job', user)
    }
}