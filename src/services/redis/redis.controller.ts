import { Version, Post, Body, Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendEmailService } from '@root/src/lib/jobs/send-mail/send-mail.service';
import { CreateDto } from '@root/src/modules/user/dto/create.dto';
import { code } from '@root/src/lib/enum';
import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@lib/exception/http-exception.filter';
import { OK } from '@lib/exception/http-status-ok';
import { HttpStatusOkInterceptor } from '@lib/exception/http-status-ok.interceptor';

@Controller('services/redis')
@ApiTags('services/redis')
export class RedisController {
  constructor(private services: SendEmailService) {}

  @Post('/public/send-mail')
  @Version('1')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Redis adicionado a uma fila' })
  public async publicSendMail(@Body() create: CreateDto) {
    await this.services.sendMail(create);
    return new OK(
      [{ message: 'Foi adicionado a uma fila' }],
      code.USER_REGISTERED,
    );
  }
}
