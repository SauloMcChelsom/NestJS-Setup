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

import { UserService } from './user.service'
import { IsEmailDTO, IsUIDDTO } from './dto/index'
import { UserMapper } from './mapper/index'

@Controller('user')
export class UsuariosController {
  
  constructor(
    private readonly service: UserService,
    private toMapper:UserMapper
  ) {}

  @Get('/find-by-acess-token')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async privateFindOneByAcessToken(@Header(new UID()) uid: string) {
    const res = await this.service.findOneUsertByUid(uid).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get('/uid/:uid')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicFindOneByUid(@Param('uid') uid: string) {
    const res = await this.service.findOneUsertByUid(uid).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get('/uid/:uid')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async privateFindOneByUid(@Param('uid') uid: string) {
    const res = await this.service.findOneUsertByUid(uid).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get('/email/:email')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async privateFindOneUserByEmail(@Param('email') email: string) {
    const res = await this.service.findOneUserByEmail(email).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  /**
   * 
   * @CacheTTL(20)
   * @UseInterceptors(CacheInterceptor) 
   */
  @Get('/email/:email')
  @Version('1/public')
  @CacheTTL(20)
  @UseFilters(Error)
  @UseInterceptors(Success)
  @UseInterceptors(CacheInterceptor) 
  public async publicFindOneUserByEmail(@Param('email') email: string) {
    const res = await this.service.findOneUserByEmail(email).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get('all2')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicFindAllUser() {
    const res = await this.service.findAll().then(res => this.toMapper.publicList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

}
