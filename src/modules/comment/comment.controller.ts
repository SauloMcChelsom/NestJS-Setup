import { Controller, Headers, Res, Redirect, HttpStatus, Req, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'

import { CommentService } from './comment.service'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'

@ApiTags('comment')
@Controller('comment')
export class CommentController {

  constructor(private readonly service: CommentService,
    private modelFirebase:FirebaseModel,
    private modelUser:UserModel,
  ) {}

  @ApiOperation({ summary: 'Buscar comentario por id do usuario' })
  @Get('/auth/user/')
  public async authFindByUserToken(@Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    return await this.service.authFindByUserToken(user.id.toString());
  }

  @ApiOperation({ summary: 'Buscar comentario por id do usuario' })
  @Get('/auth/user/:id')
  public async authFindByUserId(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    await this.modelFirebase.validateTokenByFirebase(token)

    return await this.service.authFindByUserId(id);
  }

  @ApiOperation({ summary: 'Buscar comentario por id do usuario' })
  @Get('/public/user/:id')
  public async publicFindByUserId(@Param('id') id: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    return await this.service.publicFindByUserId(id, search, limit, offset, order, column, start, end);
  }

  @ApiOperation({ summary: 'Buscar comentario por id da publicacao' })
  @Get('/public/publication/:id')
  public async findByPublicationId(@Param('id') id: string) {
    return await this.service.findByPublicationId(id);
  }

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get('/auth/:id')
  public async authFindOneById(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    return await this.service.authFindOneById(id, user.id.toString());
  }

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get('/public/:id')
  public async publicFindOneById(@Param('id') id: string) {
    return await this.service.publicFindOneById(id);
  }

  @ApiOperation({ summary: 'fazer um comentario' })
  @Post('/auth/')
  public async createComment(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    body.user_id = user.id
    return await this.service.createComment(body);
  }

  @ApiOperation({ summary: 'Atualizar um comentario' })
  @Put('/auth/:id')
  public async updateComment(@Param('id') id: string, @Body() body: UpdateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    return await this.service.updateComment(body, id, user.id.toString());
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
