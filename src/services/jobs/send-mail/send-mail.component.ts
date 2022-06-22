import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { User } from '@root/src/shared/interfaces/user.interface';


@Processor('send-mail')
export class SendMailComponent {
  private readonly logger = new Logger(SendMailComponent.name);

  @Process('send-mail-job')
  async sendEmailJob(job: Job<User>) {
    const { data } = job;

    const waitFor = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    await waitFor(3000);
    this.logger.debug(`send mail, for: ${data.email}`);
  }
}
