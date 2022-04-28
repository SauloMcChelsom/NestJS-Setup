import {
  Version,
  Controller,
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
import { UserService } from '@modules/user/user.service';
import { ClassificationInterface } from '@root/src/shared/interfaces';
import { code } from '@root/src/shared/enum';

import { PageService } from './page.service';
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

@Controller('page')
@ApiTags('page')
export class PageController {
  constructor(
    private readonly service: PageService,
    private user: UserService,
    private createMapper: CreateMapper,
    private authListMapper: AuthListMapper,
    private publicListMapper: PublicListMapper,
    private authFindOneMapper: AuthFindOneMapper,
    private publicFindOneMapper: PublicFindOneMapper,
  ) {}

  @Get('/auth/name/:page')
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  public async authFindOneByName(@Param('page') name: string) {
    const res = await this.service.authFindOneByName(name);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_CREATED);
  }

  @Get('/public/name/:page')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  public async publicfindOneByName(@Param('page') name: string) {
    const res = await this.service.publicfindOneByName(name);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/auth/:id')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar por id da pagina' })
  public async authFindOneById(@Param('id') id: number) {
    const res = await this.service.authFindOneById(id);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/public/:id')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Buscar por id da pagina' })
  public async publicfindOneById(@Param('id') id: number) {
    const res = await this.service.publicfindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/auth/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Listar todas as paginas' })
  public async authListAll(
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
    const { res, count } = await this.service.authListAll(cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/public/')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Listar todas as paginas' })
  public async publicListAll(
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
    const { res, count } = await this.service.publicListAll(cls);
    const dto = res.map((r) => this.publicListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Post('/auth')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Criar uma pagina' })
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid);

    const page: CreateInterface = {
      ...body,
      user_id: user.id,
    };

    const res = await this.service.create(page);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_CREATED);
  }

  @Put('/auth/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  public async update(
    @Body() body: UpdateDto,
    @Param('id') id: number,
    @Header(new UID()) uid: string,
  ) {
    const user = await this.user.getUserByUid(uid);
    const page: UpdateInterface = {
      ...body,
      id: id,
      user_id: user.id,
    };
    const res = await this.service.update(page);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_UPDATED);
  }
}
