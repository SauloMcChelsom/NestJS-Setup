import { Controller, Headers, Param, Get, Post, Body, Put, Delete  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { OK } from '@service/exception'
import { code, message } from '@shared/enum'

import { UserService } from './user.service'
import { UpdateDto } from './dto/update.dto'
import { CreateDto,  } from './dto/create.dto'
import { 
  CreateMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@ApiTags('user')
@Controller('user')
export class UsuariosController {

  constructor(
    private readonly service: UserService,
    private firebase:FirebaseService,
    private createMapper:CreateMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
  ) {}

  @Get('/auth/uid/')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async authFindOneByUid(@Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const res = await this.service.authFindOneByUid(decoded.uid);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @Get('/public/uid/:uid')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async publicFindOneByUid(@Param('uid') uid: string) {
    const res = await this.service.publicFindOneByUid(uid);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @Get('/auth/email/')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async authFindOneByEmail(@Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const res = await this.service.authFindOneByEmail(decoded.email+'');
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @Get('/public/email/:email')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async publicFindOneByEmail(@Param('email') email: string) {
    const res = await this.service.publicFindOneByEmail(email);
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND)
  }

  @Post('/public/')
  @ApiOperation({ summary: 'Criar um usuario' })
  public async create(@Body() create: CreateDto) {
    const res = await this.service.create(create);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.USER_REGISTERED, message.USER_REGISTERED)
  }
  
  @Put('/auth/')
  @ApiOperation({ summary: 'Atualizar usuario por uid' })
  public async update(@Body() body:UpdateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const res = await this.service.updateByUid(decoded.uid, body);
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.USER_UPDATED, message.USER_UPDATED) 
  }

  @Delete('/auth/')
  @ApiOperation({ summary: 'Excluir usuario' })
  public async deleteUserByUid(@Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    await this.service.deleteByUid(decoded.uid);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
}