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

import { JwtAuthGuard } from '@lib/guard/jwt-auth.guard';
import { TOKEN } from '@lib/pipe/token.pipe';
import { Header } from '@lib/decorator/header.decorator';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@lib/exception/http-exception.filter';
import { OK } from '@lib/exception/http-status-ok';
import { HttpStatusOkInterceptor } from '@lib/exception/http-status-ok.interceptor';
import { UserService } from '@modules/user/user.service';
import { ClassificationInterface } from '@root/src/lib/interfaces';
import { code } from '@root/src/lib/enum';

import { CommentService } from './comment.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { CreateInterface, UpdateInterface } from './interface';
import {
  CreateMapper,
  AuthListMapper,
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
  UpdateMapper,
} from './mapper';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(
    private readonly service: CommentService,
    private user: UserService,
    private createMapper: CreateMapper,
    private authListMapper: AuthListMapper,
    private publicListMapper: PublicListMapper,
    private authFindOneMapper: AuthFindOneMapper,
    private publicFindOneMapper: PublicFindOneMapper,
    private updateMapper: UpdateMapper,
  ) {}

  @Get('/user/')
  @Version('1/private')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
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
    const { res, count } = await this.service.authListByUserId(user.id, cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/user/:id')
  @Version('1/private')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async authListByUserId(
    @Param('id') id: number,
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
    const { res, count } = await this.service.authListByUserId(id, cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/user/:id')
  @Version('1/public')
  @CacheTTL(20)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async publicListByUserId(
    @Param('id') id: number,
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

    const { res, count } = await this.service.publicListByUserId(id, cls);
    const dto = res.map((r) => this.publicListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/publication/:publication_id')
  @Version('1/public')
  @CacheTTL(20) 
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
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
    );
    const dto = res.map((r) => this.publicListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get(':id')
  @Version('1/private')
  @CacheTTL(5)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar comentario por id' })
  public async authFindOneCommentById(
    @Param('id') id: number,
    @Header(new TOKEN()) token: string,
  ) {
    const user = await this.user.getUserByUid(token);
    const res = await this.service.authFindOneById(id, user.id);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get(':id')
  @Version('1/public')
  @CacheTTL(5)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar comentario por id' })
  public async publicFindOneById(@Param('id') id: number) {
    const res = await this.service.publicFindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Post()
  @Version('1/private')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Criar um comentario' })
  public async create(@Body() body: CreateDto, @Header(new TOKEN()) token: string) {
    const user = await this.user.getUserByUid(token);
    const commet: CreateInterface = { ...body };
    commet.user_id = user.id;
    const res = await this.service.create(commet);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_CREATED);
  }

  @Post('user/:user_id')
  @Version('1/public')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Criar um comentario' })
  public async createPublic(@Body() body: CreateDto, @Param('user_id') user_id: number) {
    const commet: CreateInterface = { ...body };
    commet.user_id = user_id;
    const res = await this.service.create(commet);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_CREATED);
  }

  @Put(':id')
  @Version('1/private')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Atualizar um comentario' })
  public async update(
    @Param('id') id: number,
    @Body() body: UpdateDto,
    @Header(new TOKEN()) token: string,
  ) {
    const user = await this.user.getUserByUid(token);
    const commet: UpdateInterface = { ...body, id: id, user_id: user.id };
    const res = await this.service.update(commet);
    const dto = this.updateMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_UPDATED);
  }

  @Put(':comment_id/user/:user_id/')
  @Version('1/public')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Atualizar um comentario' })
  public async updatePublic(
    @Param('user_id') user_id: number,
    @Param('comment_id') comment_id: number,
    @Body() body: UpdateDto
  ) {
    const commet: UpdateInterface = { ...body, id: comment_id, user_id: user_id };
    const res = await this.service.update(commet);
    const dto = this.updateMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_UPDATED);
  }

  @Delete(':id')
  @Version('1/private')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Deletar um comentario' })
  public async delete(@Param('id') id: number, @Header(new TOKEN()) token: string) {
    const user = await this.user.getUserByUid(token);
    await this.service.delete(id, user.id);
    return new OK([], code.DELETED_SUCCESSFULLY);
  }

  @Delete(':comment_id/user/:user_id/')
  @Version('1/public')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Deletar um comentario' })
  public async deletePublic(
    @Param('user_id') user_id: number,
    @Param('comment_id') comment_id: number,
  ) {
    await this.service.delete(comment_id, user_id);
    return new OK([], code.DELETED_SUCCESSFULLY);
  }
}
