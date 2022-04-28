import { Version, Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@root/src/shared/guard/jwt-auth.guard';
import { UID } from '@root/src/shared/pipe/token.pipe';
import { Header } from '@root/src/shared/decorator/header.decorator';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptions } from '@root/src/shared/http-status/http-exception';
import { OK } from '@root/src/shared/http-status/ok';
import { HttpResponse } from '@root/src/shared/http-status/http-response';
import { UserService } from '@modules/user/user.service';
import { code } from '@root/src/shared/enum';

import { LikeService } from './like.service';
import { CreateDto } from './dto/create.dto';
import { CreateInterface } from './interface/create.interface';
import { CreateMapper } from './mapper/create.mapper';

@Controller('like')
@ApiTags('like')
export class LikeController {
  constructor(
    private readonly service: LikeService,
    private user: UserService,
    private createMapper: CreateMapper,
  ) {}

  @Post('/auth/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Curtir uma publicação' })
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid);

    const like: CreateInterface = {
      ...body,
      user_id: user.id,
    };
    const res = await this.service.create(like);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_UPDATED);
  }
}
