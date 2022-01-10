import { Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { ClassificationInterface } from '@shared/interfaces'

import { PageService } from './page.service'
import { UpdateDto } from './dto/update.dto'
import { CreateDto,  } from './dto/create.dto'
import { CreateInterface, UpdateInterface } from './interface'

@ApiTags('page')
@Controller('page')
export class PageController {

  constructor(
    private readonly service: PageService,
    private modelFirebase:FirebaseModel,  
    private modelUser:UserModel,
  ) {}

  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  @Get('/auth/name/:page')
  public async authFindOneByName(@Param('page') name: string, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    await this.modelFirebase.validateTokenByFirebase(token)
    return await this.service.authFindOneByName(name);
  }

  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  @Get('/public/name/:page')
  public async publicfindOneByName(@Param('page') name: string) {
    return await this.service.publicfindOneByName(name);
  }

  @ApiOperation({ summary: 'Buscar por id da pagina' })
  @Get('/auth/:id')
  public async authFindOneById(@Param('id') id: number, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    await this.modelFirebase.validateTokenByFirebase(token)
    return await this.service.authFindOneById(id);
  }

  @ApiOperation({ summary: 'Buscar por id da pagina' })
  @Get('/public/:id')
  public async publicfindOneById(@Param('id') id: number) {
    return await this.service.publicfindOneById(id);
  }

  @ApiOperation({ summary: 'Listar todas as paginas' })
  @Get()
  public async authListAll(@Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    return this.service.authListAll(cls);
  }

  @ApiOperation({ summary: 'Listar todas as paginas' })
  @Get()
  public async publicListAll(@Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      search:search, 
      limit:limit, 
      offset:offset, 
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    return this.service.publicListAll(cls);
  }

  @ApiOperation({ summary: 'Criar uma pagina' })
  @Post('/auth')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) { 
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    const page:CreateInterface = {
      ...body,
      user_id:user.id
    }

    return await this.service.create(page);
  }

  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  @Put('/auth/')
  public async update(@Body() body: UpdateDto, @Param('id') id: number, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    const page:UpdateInterface = {
      ...body,
      id:id,
      user_id:user.id
    }
    return await this.service.update(page);
  }
}
