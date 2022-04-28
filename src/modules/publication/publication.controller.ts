import {
  Version,
  Controller,
  Headers,
  Param,
  Get,
  Query,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@root/src/shared/guard/jwt-auth.guard';
import { UID } from '@root/src/shared/pipe/token.pipe';
import { Header } from '@root/src/shared/decorator/header.decorator';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptions } from '@root/src/shared/http-status/http-exception';
import { OK } from '@root/src/shared/http-status/ok';
import { HttpResponse } from '@root/src/shared/http-status/http-response';
import { FirebaseService } from '@modules/firebase/firebase.service';
import { UserService } from '@modules/user/user.service';
import { ClassificationInterface } from '@root/src/shared/interfaces/classification.interface';
import { code } from '@root/src/shared/enum';

import { PublicationService } from './publication.service';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { CreateInterface, UpdateInterface } from './interface';

import {
  CreateMapper,
  AuthListMapper,
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
} from './mapper';

@Controller('publication')
@ApiTags('publication')
export class PublicationController {
  constructor(
    private readonly service: PublicationService,
    private firebase: FirebaseService,
    private user: UserService,
    private createMapper: CreateMapper,
    private authListMapper: AuthListMapper,
    private publicListMapper: PublicListMapper,
    private authFindOneMapper: AuthFindOneMapper,
    private publicFindOneMapper: PublicFindOneMapper,
  ) {}

  @Get('/auth/feed')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'List um feed' })
  public async authListFeed(
    @Headers('Authorization') authorization: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    await this.firebase.validateTokenByFirebase(authorization);
    const cls: ClassificationInterface = {
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.authListFeed(cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/public/feed')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'List um feed' })
  public async publicListFeed(
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ClassificationInterface = {
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.publicListFeed(cls);
    const dto = res.map((r) => this.publicListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/auth/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Buscar por id da publicação' })
  public async authFindOneById(@Param('id') id: number) {
    const res = await this.service.authFindOneById(id);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/public/:id')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Buscar por id da publicação' })
  public async publicfindOneById(@Param('id') id: number) {
    const res = await this.service.publicfindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/auth/search/text')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Lista de publicação pesquisando por texto' })
  public async authListSearchByText(
    @Query('text') search: string,
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
    const { res, count } = await this.service.authListSearchByText(cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/public/search/text')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Lista de publicação pesquisando por texto' })
  public async publicListSearchByText(
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
    const { res, count } = await this.service.publicListSearchByText(cls);
    const dto = res.map((r) => this.publicListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Post('/auth/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Criar uma nova publicaçao' })
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid);

    const post: CreateInterface = {
      ...body,
      user_id: user.id,
      number_of_likes: 0,
      number_of_comments: 0,
    };
    const res = await this.service.create(post);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Put('/auth/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Alterar o texto da publicaçao' })
  public async update(
    @Body() body: UpdateDto,
    @Param('id') id: number,
    @Header(new UID()) uid: string,
  ) {
    const user = await this.user.getUserByUid(uid);
    const put: UpdateInterface = {
      ...body,
      id: id,
      user_id: user.id,
    };
    const res = await this.service.update(put);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }
}
