import { Controller, Headers, Param, Get, Query, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'

import { CommentService } from './comment.service'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { CreateInterface, UpdateInterface, ClassificationInterface } from './interface'

@ApiTags('comment')
@Controller('comment')
export class CommentController {

  constructor(private readonly service: CommentService,
    private modelFirebase:FirebaseModel,
    private modelUser:UserModel,
  ) {}

  @ApiOperation({ summary: 'Listar comentarios pelo token do usuario' })
  @Get('/auth/user/')
  public async authListCommentByUserToken(@Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    const cls:ClassificationInterface = {
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return await this.service.authListCommentByUserId(user.id.toString(), cls);
  }

  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  @Get('/auth/user/:id')
  public async authListCommentByUserId(@Param('id') id: string, @Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    let token = await this.modelFirebase.isToken(authorization)
    await this.modelFirebase.validateTokenByFirebase(token)
    const cls:ClassificationInterface = {
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return await this.service.authListCommentByUserId(id, cls);
  }

  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  @Get('/public/user/:id')
  public async publicListCommentByUserId(@Param('id') id: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return await this.service.publicListCommentByUserId(id, cls);
  }

  @ApiOperation({ summary: 'Listar comentarios por id da publicacao' })
  @Get('/public/publication/:id')
  public async publicListCommentByPublicationId(@Param('id') id: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return await this.service.publicListCommentByPublicationId(id, cls);
  }

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get('/auth/:id')
  public async authFindOneCommentById(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    return await this.service.authFindOneCommentById(id, user.id.toString());
  }

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get('/public/:id')
  public async publicFindOneCommentById(@Param('id') id: string) {
    return await this.service.publicFindOneCommentById(id);
  }

  @ApiOperation({ summary: 'Criar um comentario' })
  @Post('/auth/')
  public async createComment(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    let commet:CreateInterface = { ...body }
    commet.user_id = user.id
    return await this.service.createComment(commet);
  }

  @ApiOperation({ summary: 'Atualizar um comentario' })
  @Put('/auth/:id')
  public async updateComment(@Param('id') id: string, @Body() body: UpdateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    let commet:UpdateInterface = { ...body, id:  parseInt(id), user_id: user.id}
    return await this.service.updateComment(commet);
  }

  @ApiOperation({ summary: 'Deletar um comentario' })
  @Delete('/auth/:id')
  public async deleteComment(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    return await this.service.deleteComment(id, user.id.toString());
  }
}
