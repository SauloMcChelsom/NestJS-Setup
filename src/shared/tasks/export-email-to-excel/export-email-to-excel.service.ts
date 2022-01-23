import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';



/**
          * * * * * * *
          | | | | | |
          | | | | | day of week
          | | | | month
          | | | day of month
          | | hour
          | minute
          second (optional)
*/

//       * * * * * * *	    todo segundo
//       45 * * * * *	      a cada minuto, no 45º segundo
//       0 10 * * * *	      a cada hora, no início do 10º minuto
//       0 */30 9-17 * * *	a cada 30 minutos das 9h às 17h
//       0 30 11 * * 1-5	  De segunda a sexta às 11h30


@Injectable()
export class ExportEmailExcelService {

    private readonly logger = new Logger(ExportEmailExcelService.name);


    /**
     * o método será executado uma vez por minuto, na marca de 45 segundos
     */
    /*@Cron('45 * * * * *')
    handleCron() {
      this.logger.debug('Called when the current second is 45');
    }*/

    /**
     * método será chamado a cada 30segundo
     */
    @Cron(CronExpression.EVERY_30_SECONDS)
    handleCron() {
      this.logger.debug('Called every 30 seconds');
    }

    /**
     * De segunda a sexta às 11h30
     */
    /*@Cron(CronExpression.MONDAY_TO_FRIDAY_AT_11_30AM)
    handleCron() {
      this.logger.debug('De segunda a sexta às 11h30');
    }*/

}