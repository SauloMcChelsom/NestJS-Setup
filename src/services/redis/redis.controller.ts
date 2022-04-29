import { Version, Post, Body, Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendEmailService } from '@root/src/services/jobs/send-mail/send-mail.service';
import { CreateDto } from '@root/src/modules/user/dto/create.dto';
import { code } from '@root/src/shared/enum';
import { UseInterceptors, UseFilters } from '@nestjs/common';
import { XHttpError } from '@root/src/shared/http-status/xhttp-error.exception';
import { XHttpSuccess } from '@root/src/shared/http-status/xhttp-success.interceptor';
import { OK } from '@root/src/shared/http-status/ok';

@Controller('services/redis')
@ApiTags('services/redis')
export class RedisController {
  constructor(private services: SendEmailService) {}

  @Post('/public/send-mail')
  @Version('1')
  @UseFilters(XHttpError)
  @UseInterceptors(XHttpSuccess)
  @ApiOperation({ summary: 'Redis adicionado a uma fila' })
  public async publicSendMail(@Body() create: CreateDto) {
    await this.services.sendMail(create);
    return new OK(
      [{ message: 'Foi adicionado a uma fila' }],
      code.USER_REGISTERED,
    );
  }
}
