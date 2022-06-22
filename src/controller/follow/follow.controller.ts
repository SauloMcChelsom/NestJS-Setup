import {
  Version,
  Controller,
  Param,
  Get,
  Query,
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
import { ListFilter } from '@shared/interfaces'

import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { CreateFollow } from '@shared/interfaces/follow.interface'
import { FollowMapper } from './mapper'
import { CreateDto } from './dto/index.dto'
import { FollowService } from './follow.service'


@Controller('follow')
export class FollowController {
  constructor(
    private readonly service: FollowService,
    private user: UserEntityModel,
    private toMapper: FollowMapper
  ) {}

  @Get('/page/:id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authListByIdPage(
    @Param('id') id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ListFilter = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.authListByIdPage(id, cls).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('/user/:id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authListByIdUser(
    @Param('id') id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ListFilter = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.authListByIdUser(id, cls).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Post()
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid)

    const follow: CreateFollow = {
      ...body,
      user_id: user.id,
      i_am_following: false,
    }
    const res = await this.service.create(follow).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED, null)
  }
}
/**
 * -------nova funcionalidade-----
 *
 * -quantas pessoas te seguem
 *
 * -quantas pessoas te seguiram. ex: os que te seguem e os que pararam
 *
 * -quantas pessoas pararam de te seguir
 *
 * -quantas pessoas voltaram a te seguir
 *
 * -quantas pessoas voltaram a te seguir por periodo, ex: no mês de out-dez x pessoas voltaram
 *
 * -quantas pessoas pararam a te seguir por periodo, ex: no mês de out-dez x pessoas voltaram
 *
 */
