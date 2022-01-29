import { Version, Post, Body, Controller  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { SendEmailService } from'@root/src/lib/jobs/send-mail/send-mail.service'
import { CreateDto } from '@root/src/modules/user/dto/create.dto'
import { code, message } from '@root/src/lib/enum'
import { OK } from '@root/src/lib/exception/exception'

@Controller('services/redis')
@ApiTags('services/redis')
export class RedisController {

  constructor(private services:SendEmailService) {}

  @Post('/public/send-mail')
  @Version('1')
  @ApiOperation({ summary: 'Redis adicionado a uma fila' })
  public async publicSendMail(@Body() create: CreateDto) {
    await this.services.sendMail(create);
    return new OK([{message:'Foi adicionado a uma fila'}], code.USER_REGISTERED, message.USER_REGISTERED)
  }

}