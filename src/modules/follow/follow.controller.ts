import {
  Version,
  Controller,
  Param,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@lib/guard/jwt-auth.guard';
import { UID } from '@root/src/lib/pipe/token.pipe';
import { Header } from '@lib/decorator/header.decorator';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptions } from '@root/src/lib/http-status/http-exception';
import { OK } from '@root/src/lib/http-status/ok';
import { HttpResponse } from '@root/src/lib/http-status/http-response';
import { ClassificationInterface } from '@root/src/lib/interfaces';
import { UserService } from '@modules/user/user.service';
import { code } from '@root/src/lib/enum';

import { FollowService } from './follow.service';
import { CreateDto } from './dto/create.dto';
import { CreateInterface } from './interface/create.interface';
import { AuthListMapper, CreateMapper } from './mapper';

@Controller('follow')
@ApiTags('follow')
export class FollowController {
  constructor(
    private readonly service: FollowService,
    private user: UserService,
    private authListMapper: AuthListMapper,
    private createMapper: CreateMapper,
  ) {}

  @Get('/auth/page/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Listar usuarios da pagina' })
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
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.authListByIdPage(id, cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Get('/auth/user/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Listar as paginas que o usuario segue' })
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
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.authListByIdUser(id, cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }

  @Post('/auth/')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Seguir a pagina' })
  public async create(@Body() body: CreateDto, @Header(new UID()) uid: string) {
    const user = await this.user.getUserByUid(uid);

    const follow: CreateInterface = {
      ...body,
      user_id: user.id,
      i_am_following: false,
    };
    const res = await this.service.create(follow);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_CREATED);
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
