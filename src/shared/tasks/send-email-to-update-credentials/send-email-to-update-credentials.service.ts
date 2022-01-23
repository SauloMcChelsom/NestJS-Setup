import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SendEmailUpdateCredentialsService {

    private readonly logger = new Logger(SendEmailUpdateCredentialsService.name);

    /**
     * De segunda a sexta às 11h30
     */
    @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_11_30AM)
    handleCron() {
      this.logger.debug('De segunda a sexta às 11h30');
    }

}