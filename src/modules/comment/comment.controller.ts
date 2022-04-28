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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@root/src/shared/guard/jwt-auth.guard';
import { TOKEN } from '@root/src/shared/pipe/token.pipe';
import { Header } from '@root/src/shared/decorator/header.decorator';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptions } from '@root/src/shared/http-status/http-exception';
import { OK } from '@root/src/shared/http-status/ok';
import { HttpResponse } from '@root/src/shared/http-status/http-response';
import { UserService } from '@modules/user/user.service';
import { ClassificationInterface } from '@root/src/shared/interfaces';
import { code } from '@root/src/shared/enum';

import { CommentService } from './comment.service';
import { CreateDto, UpdateDto } from './dto/index.dto';
import { CreateComment, UpdateComment } from '@shared/interfaces/comment.interface';
import { CommentMapper } from './mapper/index.mapper';

@Controller('comment')
@ApiTags('comment')
export class CommentController {

  constructor(
    private readonly service: CommentService,
    private user: UserService,
    private toMapper:CommentMapper
  ) {}

  @Get('/user/')
  @Version('1/private')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios pelo token do usuario' })
  public async authListByUserToken(
    @Header(new TOKEN()) token: string,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const user = await this.user.getUserByUid(token);
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.authListByUserId(user.id, cls).then(res => this.toMapper.authList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/user/:user_id')
  @Version('1/private')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async authListByUserId(
    @Param('user_id') user_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.authListByUserId(user_id, cls).then(res => this.toMapper.authList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/user/:user_id')
  @Version('1/public')
  @CacheTTL(20)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async publicListByUserId(
    @Param('user_id') user_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };

    const { res, count } = await this.service.publicListByUserId(user_id, cls).then(res => this.toMapper.authList(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/publication/:publication_id')
  @Version('1/public')
  @CacheTTL(20) 
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id da publicacao' })
  public async publicListByPublicationId(
    @Param('publication_id') publication_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order = 'asc',
    @Query('column') column = 'id',
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order.toUpperCase(),
      column: column.toLowerCase(),
      start: start,
      end: end,
    };
    const { res, count } = await this.service.publicListByPublicationId(
      publication_id,
      cls,
    ).then(res => this.toMapper.authList(res))

    return new OK(res, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get(':comment_id')
  @Version('1/private')
  @CacheTTL(5)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar comentario por id' })
  public async authFindOneCommentById(
    @Param('comment_id') comment_id: number,
    @Header(new TOKEN()) token: string,
  ) {
    const user = await this.user.getUserByUid(token);
    const res = await this.service.authFindOneById(comment_id, user.id).then(res => this.toMapper.authFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND);
  }

  @Get(':comment_id')
  @Version('1/public')
  @CacheTTL(5)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar comentario por id' })
  public async publicFindOneById(@Param('comment_id') comment_id: number) {
    const res = await this.service.publicFindOneById(comment_id).then(res => this.toMapper.publicFindOne(res))
    return new OK(res, code.SUCCESSFULLY_FOUND);
  }

  @Post()
  @Version('1/private')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Criar um comentario' })
  public async create(@Body() body: CreateDto, @Header(new TOKEN()) token: string) {
    const user = await this.user.getUserByUid(token);
    const commet: CreateComment = {
      ...body,
      user_id:user.id
    }
    const res = await this.service.create(commet).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED);
  }
 
  @Post('user/:user_id')
  @Version('1/public')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Criar um comentario' })
  public async createPublic(@Body() body: CreateDto, @Param('user_id') user_id: number) {
    const commet: CreateComment = {
      ...body,
      user_id:user_id
    }
    const res = await this.service.create(commet).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED);
  }

  @Put(':comment_id')
  @Version('1/private')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Atualizar um comentario' })
  public async update(
    @Param('comment_id') comment_id: number,
    @Body() body: UpdateDto,
    @Header(new TOKEN()) token: string,
  ) {
    const user = await this.user.getUserByUid(token);
    const commet: UpdateComment = { 
      ...body, 
      id: comment_id, 
      user_id: user.id 
    };
    const res = await this.service.update(commet).then(res => this.toMapper.update(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED);
  }

  @Put(':comment_id/user/:user_id/')
  @Version('1/public')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Atualizar um comentario' })
  public async updatePublic(
    @Param('user_id') user_id: number,
    @Param('comment_id') comment_id: number,
    @Body() body: UpdateDto
  ) {
    const commet: UpdateComment = { 
      ...body, 
      id: comment_id, 
      user_id: user_id 
    };
    const res = await this.service.update(commet).then(res => this.toMapper.update(res))
    return new OK(res, code.SUCCESSFULLY_UPDATED);
  }

  @Delete(':comment_id')
  @Version('1/private')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Deletar um comentario' })
  public async delete(@Param('comment_id') comment_id: number, @Header(new TOKEN()) token: string) {
    const user = await this.user.getUserByUid(token);
    await this.service.delete(comment_id, user.id);
    return new OK([], code.DELETED_SUCCESSFULLY);
  }

  @Delete(':comment_id/user/:user_id/')
  @Version('1/public')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Deletar um comentario' })
  public async deletePublic(
    @Param('user_id') user_id: number,
    @Param('comment_id') comment_id: number,
  ) {
    await this.service.delete(comment_id, user_id);
    return new OK([], code.DELETED_SUCCESSFULLY);
  }

}
