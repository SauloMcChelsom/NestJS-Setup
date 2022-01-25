import { Version, Controller, Headers, Param, Get, Post, Body, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { ClassificationInterface } from '@shared/interfaces'
import { UserService } from '@modules/user/user.service'
import { code, message } from '@shared/enum'
import { OK } from '@root/src/shared/exception/exception'

import { FollowService } from './follow.service'
import { CreateDto } from './dto/create.dto'
import { CreateInterface } from './interface/create.interface'
import { AuthListMapper, CreateMapper } from './mapper'

@Controller('follow')
@ApiTags('follow')
export class FollowController {

  constructor(
    private firebase:FirebaseService,
    private readonly service: FollowService, 
    private user:UserService,
    private authListMapper:AuthListMapper,
    private createMapper:CreateMapper
  ) {}
  
  @Get('/auth/page/:id')
  @Version('1')
  @ApiOperation({ summary: 'Listar usuarios da pagina' })
  public async authListByIdPage(@Param('id') id: number, @Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    const res = await this.service.authListByIdPage(id, cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @Get('/auth/user/:id')
  @Version('1')
  @ApiOperation({ summary: 'Listar as paginas que o usuario segue' })
  public async authListByIdUser(@Param('id') id: number, @Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    const res = await this.service.authListByIdUser(id, cls);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  @Post('/auth/')
  @Version('1')
  @ApiOperation({ summary: 'Seguir a pagina' })
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const follow:CreateInterface = {
      ...body,
      user_id: user.id,
      i_am_following: false
    }
    const res = await this.service.create(follow);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
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
