import { Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { ClassificationInterface } from '@shared/interfaces'
import { OK } from '@root/src/shared/exception/exception'
import { code, message } from '@shared/enum'

import { PublicationService } from './publication.service'
import { UpdateDto } from './dto/update.dto'
import { CreateDto,  } from './dto/create.dto'
import { CreateInterface, UpdateInterface } from './interface'

import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@ApiTags('publication')
@Controller('publication')
export class PublicationController {
  
  constructor(
    private readonly service: PublicationService,
    private firebase:FirebaseService,
    private user:UserService,
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
  ) {}

  @ApiOperation({ summary: 'List um feed' })
  @Get('/auth/feed')
  public async authListFeed(@Headers('Authorization') authorization: string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const cls:ClassificationInterface = {
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0,
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const res = await this.service.authListFeed(cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'List um feed' })
  @Get('/public/feed')
  public async publicListFeed(@Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = {
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0,
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const res =  await this.service.publicListFeed(cls);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Buscar por id da publicação' })
  @Get('/auth/:id')
  public async authFindOneById(@Param('id') id: number, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const res = await this.service.authFindOneById(id);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Buscar por id da publicação' })
  @Get('/public/:id')
  public async publicfindOneById(@Param('id') id: number) {
    const res =  await this.service.publicfindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Lista de publicação pesquisando por texto' })
  @Get('/auth/search/text')
  public async authListSearchByText(@Headers('Authorization') authorization: string, @Query('text') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const cls:ClassificationInterface = { 
      search:search, 
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0,
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const res =  await this.service.authListSearchByText(cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Lista de publicação pesquisando por texto' })
  @Get('/public/search/text')
  public async publicListSearchByText(@Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
    const cls:ClassificationInterface = { 
      search:search, 
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0,
      order:order, 
      column:column, 
      start:start, 
      end:end
    }
    const res =  await this.service.publicListSearchByText(cls);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Criar uma nova publicaçao' })
  @Post('/auth/')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const post:CreateInterface = {
      ...body,
      user_id:user.id,
      number_of_likes:0,
      number_of_comments:0
    }
    const res =  await this.service.create(post);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
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
    const res =  await this.service.update(put);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

}
