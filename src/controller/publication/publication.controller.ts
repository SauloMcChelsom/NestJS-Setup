import {
  Version,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Param,
  Get,
  Query,
  Post,
  Body,
  Put,
  Delete,
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
import { ListFilter, CreateComment, UpdateComment } from '@shared/interfaces'

import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { PublicationService } from './publication.service'
import { UpdateDto, CreateDto } from './dto/index.dto'
import { CreatePublication, UpdatePublication } from '@shared/interfaces/publication.interface'

import { PageMapper } from './mapper'

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly service: PublicationService,
    private user: UserEntityModel,
    private toMapper: PageMapper,
  ) {}

  @Get('page/:id')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicListFeed(
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Param('id') id: number
  ) {
    const cls: ListFilter = {
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.listPublicationByPage(id, cls).then(res => this.toMapper.publicList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('page/:id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authListFeed(
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Param('id') id: number
  ) {
    const cls: ListFilter = {
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.listPublicationByPage(id, cls).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('feed')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async listFeed(
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Param('id') id: number
  ) {
    const cls: ListFilter = {
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.feed(id, cls).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('feed')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async PublicListFeed(
    @Query('limit') limit = '10',
    @Query('offset') offset = '0',
    @Query('order') order = 'ASC',
    @Query('column') column = 'id',
    @Query('start') start: string,
    @Query('end') end: string,
    @Param('id') id: number
  ) {
    const cls: ListFilter = {
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.publicFeed(cls).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get(':id')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicfindOneById(@Param('id') id: number) {
    const res = await this.service.publicfindOneById(id).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get(':id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authFindOneById(@Param('id') id: number) {
    const res = await this.service.authFindOneById(id).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get('search/text')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicListSearchByText(
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
    const { res, count } = await this.service.publicListSearchByText(cls).then(res => this.toMapper.publicList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('search/text')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authListSearchByText(
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
    const { res, count } = await this.service.authListSearchByText(cls).then(res => this.toMapper.privateList(res))
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

    const post: CreatePublication = {
      ...body,
      user_id: user.id,
      number_of_likes: 0,
      number_of_comments: 0,
    }
    const res = await this.service.create(post).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED)
  }

  @Put(':id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async update(
    @Body() body: UpdateDto,
    @Param('id') id: number,
    @Header(new UID()) uid: string,
  ) {
    const user = await this.user.getUserByUid(uid)
    const put: UpdatePublication = {
      ...body,
      id: id,
      user_id: user.id,
    }
    const res = await this.service.update(put).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED)
  }
}
