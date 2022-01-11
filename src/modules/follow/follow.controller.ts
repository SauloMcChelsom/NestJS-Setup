import { Controller, Headers, Param, Get, Post, Body, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { ClassificationInterface } from '@shared/interfaces'

import { FollowService } from './follow.service'
import { CreateDto } from './dto/create.dto'

@ApiTags('follow')
@Controller('follow')
export class FollowController {

  constructor(private firebase:FirebaseService,private readonly service: FollowService) {}
  
  @ApiOperation({ summary: 'Listar usuarios da pagina' })
  @Get('/auth/page/:id')
  public async authListByIdPage(@Param('id') id: string, @Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    return await this.service.authListByIdPage(id, cls);
  }

  @ApiOperation({ summary: 'Listar as paginas que o usuario segue' })
  @Get('/auth/user/:id')
  public async authListByIdUser(@Param('id') id: string, @Headers('Authorization') authorization: string, @Query('search') search:string, @Query('limit') limit:number, @Query('offset') offset:number, @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
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
    return await this.service.authListByIdUser(id, cls);
  }

  @ApiOperation({ summary: 'Seguir a pagina' })
  @Post('/auth/')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    return await this.service.create(body);
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
