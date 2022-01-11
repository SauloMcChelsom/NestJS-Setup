import { Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { ClassificationInterface } from '@shared/interfaces'

import { PublicationService } from './publication.service'
import { UpdateDto } from './dto/update.dto'
import { CreateDto,  } from './dto/create.dto'
import { CreateInterface, UpdateInterface } from './interface'

@ApiTags('publication')
@Controller('publication')
export class PublicationController {
  
  constructor(
    private readonly service: PublicationService,
    private firebase:FirebaseService,
    private user:UserService,
  ) {}

  @ApiOperation({ summary: 'List um feed' })
  @Get('/auth/feed')
  public async authListFeed(@Headers('Authorization') authorization: string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const cls:ClassificationInterface = {
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return this.service.authListFeed(cls);
  }

  @ApiOperation({ summary: 'List um feed' })
  @Get('/public/feed')
  public async publicListFeed(@Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return this.service.publicListFeed(cls);
  }

  @ApiOperation({ summary: 'Buscar por id da publicação' })
  @Get('/auth/:id')
  public async authFindOneById(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    return await this.service.authFindOneById(id);
  }

  @ApiOperation({ summary: 'Buscar por id da publicação' })
  @Get('/public/:id')
  public async publicfindOneById(@Param('id') id: string) {
    return await this.service.publicfindOneById(id);
  }

  @ApiOperation({ summary: 'Lista de publicação pesquisando por texto' })
  @Get('/auth/search/text')
  public async authListSearchByText(@Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const cls:ClassificationInterface = { 
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return await this.service.authListSearchByText(cls);
  }

  @ApiOperation({ summary: 'Lista de publicação pesquisando por texto' })
  @Get('/public/search/text')
  public async publicListSearchByText(@Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = { 
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return await this.service.publicListSearchByText(cls);
  }

  @ApiOperation({ summary: 'Criar uma nova publicaçao' })
  @Post('/auth/')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    let token = await this.firebase.isToken(authorization)
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const post:CreateInterface = {
      ...body,
      user_id:user.id,
      number_of_likes:0
    }
    return await this.service.create(post);
  }

  @ApiOperation({ summary: 'Alterar o texto da publicaçao' })
  @Put('/auth/:id')
  public async update(@Body() body: UpdateDto, @Param('id') id: number, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
    const put:UpdateInterface = {
      ...body,
      id:id,
      user_id:user.id
    }
    return await this.service.update(put);
  }

}
