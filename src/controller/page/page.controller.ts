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
import { ListFilter} from '@shared/interfaces'
import { CreatePage, UpdatePage } from '@shared/interfaces/page.interface'

import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { CreateDto, UpdateDto } from './dto/index.dto'
import { PageMapper } from './mapper'
import { PageService } from './page.service'

@Controller('page')
export class PageController {
  constructor(
    private readonly service: PageService,
    private user: UserEntityModel,
    private toMapper: PageMapper,
  ) {}

  @Get()
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicListAll(
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
      order: order,
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.publicListAll(cls).then(res => this.toMapper.publicList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get()
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authListAll(
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
      order: order,
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.authListAll(cls).then(res => this.toMapper.privateList(res))
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

  @Get('/page-name/:page')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicfindOneByName(@Param('page') name: string) {
    const res = await this.service.publicfindOneByName(name).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get('/page-name/:page')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async authFindOneByName(@Param('page') name: string) {
    const res = await this.service.authFindOneByName(name).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_CREATED)
  }

  @Post()
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid)

    const page: CreatePage = {
      ...body,
      user_id: user.id,
    }

    const res = await this.service.create(page).then(res => this.toMapper.create(res))
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
    @Header(new UID()) uid: any,
  ) {
    console.log(uid)
    const user = await this.user.getUserByUid(uid)
    
    const page: UpdatePage = {
      ...body,
      id: id,
      user_id: user.id,
    }
    
    const res = await this.service.update(page).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED)
  }
}
