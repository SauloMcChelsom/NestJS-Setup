import { Controller, Param, Get, Post, Body, Put, Delete, Headers } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { message } from '@shared/enum'
import { CreateNewUserDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UsuariosController {
  constructor(private readonly service: UserService) {}
 
  @Get('/auth')
  @ApiOperation({ summary: 'Listar todos usuarios da base' })
  public async findAll(@Headers('Authorization') token: string) {
    return this.service.findAll(token);
  }

  @Get('/auth/get-user-by-uid/:uid')
  @ApiOperation({ summary: 'Obter informação do usuario por uid' })
  public async getUserByUid(@Param('uid') uid: string, @Headers('Authorization') token: string) {
    return await this.service.getUserByUid(uid, token);
  }

  @Get('/auth/get-user-by-email/:email')
  @ApiOperation({ summary: 'Obter informação do usuario por email' })
  public async getUserByEmail(@Param('email') email: string, @Headers('Authorization') token: string) {
    return await this.service.getUserByEmail(email, token);
  }

  @Put('/auth/:uid')
  @ApiOperation({ summary: 'Atualizar usuario por uid' })
  public async update(@Param('uid') uid: string, @Body() updateDto:UpdateUserDto, @Headers('Authorization') token: string) {
    return await this.service.updateUserByUid(uid, updateDto, token);
  }

  @Delete('/auth/:uid')
  @ApiOperation({ summary: 'Excluir usuario' })
  public async deleteUserByUid(@Param('uid') uid: string, @Headers('Authorization') token: string) {
    return await this.service.deleteUserByUid(uid, token);
  }

  @Delete('/auth')
  @ApiOperation({ summary: 'Excluir todos  usuario' })
  public async deleteTodosUsuarios(@Headers('Authorization') token: string) {
    return await this.service.deleteTodosUsuarios(token);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um usuario' })
  public async save(@Body() create: CreateNewUserDto) {
    return await this.service.save(create);
  }

  @Get('/check-user-exists-by-email/:email')
  @ApiOperation({ summary: 'Checar se o usuario existe por email' })
  public async checkUserExistsByEmail(@Param('email') email: string) {
    return await this.service.checkUserExistsByEmail(email);
  }
}