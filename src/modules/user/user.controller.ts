import { Controller, Headers, Param, Get, Query, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { ClassificationInterface } from '@shared/interfaces'

import { UserService } from './user.service'
import { UpdateDto } from './dto/update.dto'
import { CreateDto,  } from './dto/create.dto'
import { CreateInterface, UpdateInterface } from './interface'

@ApiTags('user')
@Controller('user')
export class UsuariosController {

  constructor(
    private readonly service: UserService,
    private modelFirebase:FirebaseModel,  
    private modelUser:UserModel,
  ) {}

  @Get('/auth/uid/')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async authFindOneByUid(@Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    let user = await this.modelFirebase.validateTokenByFirebase(token)
    return await this.service.authFindOneByUid(user.uid);
  }

  @Get('/public/uid/:uid')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async publicFindOneByUid(@Param('uid') uid: string) {
    return await this.service.publicFindOneByUid(uid);
  }

  @Get('/auth/email/')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async authFindOneByEmail(@Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    let user = await this.modelFirebase.validateTokenByFirebase(token)
    return await this.service.authFindOneByEmail(user.email+'');
  }

  @Get('/public/email/:email')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async publicFindOneByEmail(@Param('email') email: string) {
    return await this.service.publicFindOneByEmail(email);
  }

  @Post('/auth/')
  @ApiOperation({ summary: 'Criar um usuario' })
  public async create(@Body() create: CreateDto) {
    return await this.service.create(create);
  }
  
  @Put('/auth/')
  @ApiOperation({ summary: 'Atualizar usuario por uid' })
  public async update(@Body() body:UpdateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    let user = await this.modelFirebase.validateTokenByFirebase(token)

    return await this.service.updateByUid(user.uid, body);
  }

  @Delete('/auth/')
  @ApiOperation({ summary: 'Excluir usuario' })
  public async deleteUserByUid(@Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    let user = await this.modelFirebase.validateTokenByFirebase(token)
    return await this.service.deleteByUid(user.uid);
  }
}