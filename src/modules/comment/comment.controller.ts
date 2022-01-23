import { UseInterceptors, CacheInterceptor, CacheKey, CacheTTL, Controller, Headers, Param, Get, Query, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { ClassificationInterface } from '@shared/interfaces'
import { OK } from '@root/src/shared/exception/exception'
import { code, message } from '@shared/enum'

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

@ApiTags('comment')
@Controller('comment')
export class CommentController {

  constructor(
    private readonly service: CommentService,
    private firebase:FirebaseService,
    private user:UserService,
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
    private updateMapper:UpdateMapper
  ) {}

  @ApiOperation({ summary: 'Listar comentarios pelo token do usuario' })
  @Get('/auth/user/')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  public async authListByUserToken(@Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
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

  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  @Get('/auth/user/:id')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  public async authListByUserId(@Param('id') id: number, @Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    await this.firebase.validateTokenByFirebase(authorization)
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

  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  @Get('/public/user/:id')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
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

  @ApiOperation({ summary: 'Listar comentarios por id da publicacao' })
  @Get('/public/publication/:id')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
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

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get('/auth/:id')
  @CacheTTL(5)
  @UseInterceptors(CacheInterceptor)
  public async authFindOneCommentById(@Param('id') id: number, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
    let res = await this.service.authFindOneById(id, user.id);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get('/public/:id')
  @CacheTTL(5)
  @UseInterceptors(CacheInterceptor)
  public async publicFindOneById(@Param('id') id: number) {
    let res = await this.service.publicFindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Criar um comentario' })
  @Post('/auth/')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
    let commet:CreateInterface = { ...body }
    commet.user_id = user.id
    let res = await this.service.create(commet);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @ApiOperation({ summary: 'Atualizar um comentario' })
  @Put('/auth/:id')
  public async update(@Param('id') id: number, @Body() body: UpdateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
    let commet:UpdateInterface = { ...body, id:  id, user_id: user.id}
    let res = await this.service.update(commet);
    const dto = this.updateMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  @ApiOperation({ summary: 'Deletar um comentario' })
  @Delete('/auth/:id')
  public async delete(@Param('id') id: number, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
    await this.service.delete(id, user.id);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
}
