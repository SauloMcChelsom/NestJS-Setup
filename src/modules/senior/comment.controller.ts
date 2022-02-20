import { Controller, Headers, Post, Body  } from '@nestjs/common'

import { OK } from '@root/src/lib/exception/exception'
import { code, message } from '@root/src/lib/enum'

import { CommentService } from './comment.service'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'

@Controller('senior')
export class SeniorController {

  constructor(private readonly service: CommentService) {}
  @Post('/incluir-pessoa')
  public async create(@Body() body: CreateDto) {
    let res = await this.service.create(body);
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }
 
}
