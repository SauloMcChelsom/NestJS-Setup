import { Version, Controller, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@lib/guard/jwt-auth.guard'
import { UID } from '@lib/pipe/uid.pipe'
import { Header } from '@lib/decorator/header.decorator';

import { UseInterceptors, UseFilters } from '@nestjs/common'
import { HttpExceptionFilter } from '@lib/exception/http-exception.filter'
import { OK } from '@lib/exception/http-status-ok'
import { HttpStatusOkInterceptor } from '@lib/exception/http-status-ok.interceptor'
import { UserService } from '@modules/user/user.service'
import { code } from '@root/src/lib/enum'

import { LikeService } from './like.service'
import { CreateDto } from './dto/create.dto'
import { CreateInterface } from './interface/create.interface'
import { CreateMapper } from './mapper/create.mapper'

@Controller('like')
@ApiTags('like')
export class LikeController {

  constructor(
    private readonly service: LikeService,
    private user:UserService,
    private createMapper:CreateMapper
  ) {}

  @Post('/auth/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Curtir uma publicação' })
  public async create(@Body() body: CreateDto, @Header(new UID()) uid:string) {
    const user = await this.user.getUserByUid(uid)

    const like:CreateInterface = {
      ...body,
      user_id: user.id
    }
    let res = await this.service.create(like);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED)
  }
}
