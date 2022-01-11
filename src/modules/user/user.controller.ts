import { Controller, Headers, Param, Get, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'

import { UserService } from './user.service'
import { UpdateDto } from './dto/update.dto'
import { CreateDto,  } from './dto/create.dto'

@ApiTags('user')
@Controller('user')
export class UsuariosController {

  constructor(
    private readonly service: UserService,
    private firebase:FirebaseService
  ) {}

  @Get('/auth/uid/')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async authFindOneByUid(@Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    return await this.service.authFindOneByUid(decoded.uid);
  }

  @Get('/public/uid/:uid')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async publicFindOneByUid(@Param('uid') uid: string) {
    return await this.service.publicFindOneByUid(uid);
  }

  @Get('/auth/email/')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async authFindOneByEmail(@Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    return await this.service.authFindOneByEmail(decoded.email+'');
  }

  @Get('/public/email/:email')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async publicFindOneByEmail(@Param('email') email: string) {
    return await this.service.publicFindOneByEmail(email);
  }

  @Post('/public/')
  @ApiOperation({ summary: 'Criar um usuario' })
  public async create(@Body() create: CreateDto) {
    return await this.service.create(create);
  }
  
  @Put('/auth/')
  @ApiOperation({ summary: 'Atualizar usuario por uid' })
  public async update(@Body() body:UpdateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)

    return await this.service.updateByUid(decoded.uid, body);
  }

  @Delete('/auth/')
  @ApiOperation({ summary: 'Excluir usuario' })
  public async deleteUserByUid(@Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    return await this.service.deleteByUid(decoded.uid);
  }
}