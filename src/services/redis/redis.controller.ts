import { Version, Post, Body, Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendEmailService } from '@root/src/services/jobs/send-mail/send-mail.service';
import { CreateDto } from '@root/src/modules/user/dto/create.dto';
import { code } from '@root/src/shared/enum';
import { UseInterceptors, UseFilters } from '@nestjs/common';
import { Error } from '@root/src/shared/response/error.response';
import { Success } from '@root/src/shared/response/success.response';
import { OK } from '@root/src/shared/response/ok';

@Controller('services/redis')
@ApiTags('services/redis')
export class RedisController {
  constructor(private services: SendEmailService) {}

  @Post('/public/send-mail')
  @Version('1')
  @UseFilters(Error)
  @UseInterceptors(Success)
  @ApiOperation({ summary: 'Redis adicionado a uma fila' })
  public async publicSendMail(@Body() create: CreateDto) {
    await this.services.sendMail(create);
    return new OK(
      [{ message: 'Foi adicionado a uma fila' }],
      code.USER_REGISTERED,
    );
  }
}
