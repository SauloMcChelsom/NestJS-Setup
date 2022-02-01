import { Version, UseInterceptors, CacheInterceptor, CacheTTL, Controller, Param, Get, Query, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@lib/guard/jwt-auth.guard'
import { UID } from '@lib/pipe/uid.pipe'
import { Header } from '@lib/decorator/header.decorator'

import { UserService } from '@modules/user/user.service'
import { ClassificationInterface } from '@root/src/lib/interfaces'
import { OK } from '@root/src/lib/exception/exception'
import { code, message } from '@root/src/lib/enum'

import { CommentService } from './comment.service'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { CreateInterface, UpdateInterface } from './interface' 
import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
  UpdateMapper
} from './mapper'

@Controller('comment')
@ApiTags('comment')
export class CommentController {

  constructor(
    private readonly service: CommentService,
    private user:UserService,
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
    private updateMapper:UpdateMapper
  ) {}

  @Get('/auth/user/')
  @Version('1')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios pelo token do usuario' })
  public async authListByUserToken(@Header(new UID()) uid:string, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const user = await this.user.getUserByUid(uid)
    const cls:ClassificationInterface = {
      search:search, 
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const  res = await this.service.authListByUserId(user.id, cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @Get('/auth/user/:id')
  @Version('1')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async authListByUserId(@Param('id') id: number, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      search:search, 
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const  res = await this.service.authListByUserId(id, cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @Get('/public/user/:id')
  @Version('1')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async publicListByUserId(@Param('id') id: number, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      search:search, 
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const  res = await this.service.publicListByUserId(id, cls);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @Get('/public/publication/:id')
  @Version('1')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id da publicacao' })
  public async publicListByPublicationId(@Param('id') id: number, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = { 
      search:search, 
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    let res = await this.service.publicListByPublicationId(id, cls);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @Get('/auth/:id')
  @Version('1')
  @CacheTTL(5)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar comentario por id' })
  public async authFindOneCommentById(@Param('id') id: number, @Header(new UID()) uid:string) {
    const user = await this.user.getUserByUid(uid)
    let res = await this.service.authFindOneById(id, user.id);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @Get('/public/:id')
  @Version('1')
  @CacheTTL(5)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar comentario por id' })
  public async publicFindOneById(@Param('id') id: number) {
    let res = await this.service.publicFindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @Post('/auth/')
  @Version('1')
  @ApiOperation({ summary: 'Criar um comentario' })
  public async create(@Body() body: CreateDto, @Header(new UID()) uid:string) {
    const user = await this.user.getUserByUid(uid)
    let commet:CreateInterface = { ...body }
    commet.user_id = user.id
    let res = await this.service.create(commet);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @Put('/auth/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar um comentario' })
  public async update(@Param('id') id: number, @Body() body: UpdateDto, @Header(new UID()) uid:string) {
    const user = await this.user.getUserByUid(uid)
    let commet:UpdateInterface = { ...body, id:  id, user_id: user.id}
    let res = await this.service.update(commet);
    const dto = this.updateMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  @Delete('/auth/:id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar um comentario' })
  public async delete(@Param('id') id: number, @Header(new UID()) uid:string) {
    const user = await this.user.getUserByUid(uid)
    await this.service.delete(id, user.id);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
 
}
