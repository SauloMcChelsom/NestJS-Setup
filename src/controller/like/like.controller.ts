import {
  Version,
  Controller,
  Post,
  Body,
  UseGuards, 
  UseInterceptors, 
  UseFilters 
} from '@nestjs/common'

import { JwtAuthAccessTokenGuard } from '@shared/guard/jwt-auth.guard'
import { JwtAuthRefreshTokenGuard } from '@shared/guard/refresh-token.guard'
import { RolesGuard } from '@shared/guard/roles.guard'
import { UserMachinePropertyGuard } from '@shared/guard/user-machine-property.guard'

import { UID } from '@shared/pipe/token.pipe'

import { Header } from '@shared/decorator/header.decorator'
import { hasRoles } from '@shared/decorator/roles.decorator'

import { Error } from '@shared/response/error.response'
import { Success } from '@shared/response/success.response'
import { OK } from '@shared/response/ok'

import { Role, code } from '@shared/enum'
import { CreateLike } from '@shared/interfaces/like.interface';

import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { LikeService } from './like.service';
import { CreateDto } from './dto/index.dto';

import { LikeMapper } from './mapper/index.mapper';

@Controller('like')
export class LikeController {
  constructor(
    private readonly service: LikeService,
    private user: UserEntityModel,
    private toMapper: LikeMapper,
  ) {}

  @Post()
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid)

    const like: CreateLike = {
      ...body,
      user_id: user.id,
    }
    const res = await this.service.create(like).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED)
  }
}
