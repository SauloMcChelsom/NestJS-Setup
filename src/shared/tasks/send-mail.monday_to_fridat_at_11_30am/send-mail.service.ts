import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendEmailService } from'@shared/jobs/send-mail/send-mail.service'

@Injectable()
export class SendMailService {
  private readonly logger = new Logger(SendMailService.name);

  constructor(private sendEmail:SendEmailService) {}

  /**
  * De segunda a sexta às 11h30
  */
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug('Email foi adicionado a uma fila');
    await this.sendEmail.sendMail({
      "uid": "DOPbZRi09cPnJVJYWet8fkQN1234",
      "name": "saulo",
      "email": "saulo@gmail.com",
      "providers": "google.com",
      "password":"123456789"
    });
  }
}