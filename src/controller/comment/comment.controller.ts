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

import { CommentService } from './comment.service'
import { CreateDto, UpdateDto } from './dto/index.dto'
import { CommentMapper } from './mapper/index.mapper'

@Controller('comment')
export class CommentController {

  constructor(
    private readonly service: CommentService,
    private userModel: UserEntityModel,
    private toMapper:CommentMapper
  ) {}

  @Get('/list-by-acess-token')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async privateListCommentByAcessToken(
    @Header(new UID()) uid: string,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const user = await this.userModel.getUserByUid(uid)
    const filter: ListFilter = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.listCommentByUserId(user.id, filter).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('/list-by-user-id/:user_id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async privateListCommentByUserId(
    @Param('user_id') user_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const filter: ListFilter = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    }
    const { res, count } = await this.service.listCommentByUserId(user_id, filter).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('/list-by-user-id/:user_id')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicListCommentByUserId(
    @Param('user_id') user_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const filter: ListFilter = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    }

    const { res, count } = await this.service.listCommentByUserId(user_id, filter).then(res => this.toMapper.publicList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('/list-by-publication-id/:publication_id')
  @Version('1/public')
  @UseFilters(Error) 
  @UseInterceptors(Success)
  public async publicListCommentByPublicationId(
    @Param('publication_id') publication_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order = 'asc',
    @Query('column') column = 'id',
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const filter: ListFilter = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column.toLowerCase(),
      start: start,
      end: end,
    }
    const { res, count } = await this.service.listCommentByPublicationId(publication_id, filter).then(res => this.toMapper.privateList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get(':id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async privateFindOneCommentById(
    @Param('id') id: number,
    @Header(new UID()) token: string,
  ) {
    const user = await this.userModel.getUserByUid(token)
    const res = await this.service.findOneCommentByIdEndUserId(id, user.id).then(res => this.toMapper.privateFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Get(':id')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicindOneCommentById(@Param('id') id: number) {
    const res = await this.service.findOneCommentById(id).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND)
  }

  @Post()
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async createNewCommentByAcessToken(@Body() body: CreateDto, @Header(new UID()) token: string) {
    const user = await this.userModel.getUserByUid(token)
    const commet: CreateComment = {
      ...body,
      user_id:user.id
    }
    const res = await this.service.create(commet).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED)
  }
 
  @Post('/create-new-comment-by-user-id/:user_id')
  @Version('1/public')
  @UseFilters(Error) 
  @UseInterceptors(Success)
  public async createNewCommentByUserId(@Body() body: CreateDto, @Param('user_id') user_id: number) {
    const commet: CreateComment = {
      ...body,
      user_id:user_id
    }
    const res = await this.service.create(commet).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED)
  }

  @Put(':id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async update(
    @Param('id') id: number,
    @Body() body: UpdateDto,
    @Header(new UID()) token: string,
  ) {
    const user = await this.userModel.getUserByUid(token)
    const commet: UpdateComment = { 
      ...body, 
      id: id, 
      user_id: user.id 
    }
    const res = await this.service.update(commet).then(res => this.toMapper.update(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED)
  }

  @Put(':comment_id/user/:user_id/')
  @Version('1/public')
  @UseFilters(Error) 
  @UseInterceptors(Success)
  public async publicUpdate(
    @Param('user_id') user_id: number,
    @Param('comment_id') comment_id: number,
    @Body() body: UpdateDto
  ) {
    const commet: UpdateComment = { 
      ...body, 
      id: comment_id, 
      user_id: user_id 
    }
    const res = await this.service.update(commet).then(res => this.toMapper.update(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED)
  }

  @Delete(':comment_id')
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async delete(@Param('comment_id') comment_id: number, @Header(new UID()) token: string) {
    const user = await this.userModel.getUserByUid(token)
    await this.service.delete(comment_id, user.id)
    return new OK([], code.DELETED_SUCCESSFULLY)
  }

  @Delete(':comment_id/user/:user_id/')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicDelete(
    @Param('user_id') user_id: number,
    @Param('comment_id') comment_id: number,
  ) {
    await this.service.delete(comment_id, user_id)
    return new OK([], code.DELETED_SUCCESSFULLY)
  }

}
