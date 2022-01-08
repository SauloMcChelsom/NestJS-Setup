import { Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
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
    private modelFirebase:FirebaseModel,  
    private modelUser:UserModel,
  ) {}

  @ApiOperation({ summary: 'List um feed' })
  @Get('/auth/feed')
  public async authListFeed(@Headers('Authorization') authorization: string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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

  @Get('/auth/:id')
  public async authFindOneById(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    await this.modelFirebase.validateTokenByFirebase(token)
    return await this.service.authFindOneById(id);
  }

  @Get('/public/:id')
  public async publicfindOneById(@Param('id') id: string) {
    return await this.service.publicfindOneById(id);
  }

  @Get('/auth/search/text')
  public async authListSearchByText(@Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    return await this.service.authListSearchByText(cls);
  }

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
  @Post()
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    const post:CreateInterface = {
      ...body,
      user_id:user.id,
      number_of_likes:0
    }
    return await this.service.create(post);
  }

  @ApiOperation({ summary: 'Alterar o texto da minha publicaçao' })
  @Put(':id')
  public async update(@Body() body: UpdateDto, @Param('id') id: number, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    const put:UpdateInterface = {
      ...body,
      id:id,
      user_id:user.id
    }
    return await this.service.update(put);
  }

}
