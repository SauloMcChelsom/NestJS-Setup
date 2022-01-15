import { Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { ClassificationInterface } from '@shared/interfaces'
import { OK } from '@root/src/shared/exception/exception'
import { code, message } from '@shared/enum'

import { PageService } from './page.service'
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

@ApiTags('page')
@Controller('page')
export class PageController {

  constructor(
    private readonly service: PageService,
    private firebase:FirebaseService,  
    private user:UserService,
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper
  ) {}

  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  @Get('/auth/name/:page')
  public async authFindOneByName(@Param('page') name: string, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const res = await this.service.authFindOneByName(name);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  @Get('/public/name/:page')
  public async publicfindOneByName(@Param('page') name: string) {
    const res = await this.service.publicfindOneByName(name);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Buscar por id da pagina' })
  @Get('/auth/:id')
  public async authFindOneById(@Param('id') id: number, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const res = await this.service.authFindOneById(id);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Buscar por id da pagina' })
  @Get('/public/:id')
  public async publicfindOneById(@Param('id') id: number) {
    const res = await this.service.publicfindOneById(id);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @ApiOperation({ summary: 'Listar todas as paginas' })
  @Get('/auth/')
  public async authListAll(@Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    const res = await this.service.authListAll(cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Listar todas as paginas' })
  @Get('/public/')
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
    const res = await this.service.publicListAll(cls);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @ApiOperation({ summary: 'Criar uma pagina' })
  @Post('/auth')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) { 
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const page:CreateInterface = {
      ...body,
      user_id:user.id
    }

    const res = await this.service.create(page);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  @Put('/auth/:id')
  public async update(@Body() body: UpdateDto, @Param('id') id: number, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
    const page:UpdateInterface = {
      ...body,
      id:id,
      user_id:user.id,

    }
    const res = await this.service.update(page);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }
}
