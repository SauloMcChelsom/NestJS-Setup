import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateNewUserDto } from './dto'
import { 
  UserGetNotFoundSwagger,
  UserGetOkSwagger,
  UserPostBabRequestSwagger,
  UserPostConflictSwagger,
  UserPostCreatedSwagger,
  UserDeletedInfoSwagger,
  UserDeletedIdInfoSwagger,
  UserGetCheckIfUserExistsOkSwagger,
  UserGetIdOkSwagger,
  UserPutInfoSwagger
} from '../../swagger/'

import { UserService } from './user.service'

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('user')
export class UsuariosController {
  
  constructor(private readonly service: UserService) {}
 
  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario cadastrado com sucesso',
    type: UserPostCreatedSwagger
  })
  @ApiResponse({
    status: 400, 
    description: 'Parametros ou propriedades, informados errados ou inexistentes',
    type :UserPostBabRequestSwagger
  })
  @ApiResponse({
    status: 409, 
    description: 'Duplicidade de valor unico no banco de dados',
    type :UserPostConflictSwagger
  })
  public async save(@Body() create: CreateNewUserDto) {
    return await this.service.save(create);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserGetOkSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })
  public async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuarios por id' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserGetIdOkSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })
  public async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Get('/check-if-user-exists/:email')
  @ApiOperation({ summary: 'Verificar se o usuario existe por email' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserGetCheckIfUserExistsOkSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })
  public async checkIfUserExistsByEmail(@Param('email') email: string) {
    return await this.service.checkIfUserExistsByEmail(email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuario por id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario atualizado com sucesso',
    type: UserPutInfoSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })
  public async update(@Param('id') id: string, @Body() updateDto) {
    return await this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuarios por id' })
  @ApiResponse({
    status: 202,
    description: 'Usuario deletado com sucesso',
    type: UserDeletedIdInfoSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })
  public async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar todos usuarios' })
  @ApiResponse({
    status: 202,
    description: 'Todos os usuario foram deletados',
    type: UserDeletedInfoSwagger
  })
  public async deleteTodosUsuarios() {
    return await this.service.deleteTodosUsuarios();
  }



  /*@Get('http/ok')
  public ok() {
    return new Client().OK([{
      code:"xxx-info",
      message:"Isso esta certo?",
    }])
  }

  @Get('http/info')
  public Info() {
    return new Client().Info({
      code:"xxx-info",
      message:"Isso esta certo?",
    })
  }

  @Get('http/BadRequestException')
  public BadRequestException() {
    throw new Client().BadRequestException({
      code:"xxx-info",
      message:"Isso esta certo?",
    })
  }

  @Get('http/exception')
  public exception() {
    throw new Client().HttpException({
      code:code.EMAIL_ALREADY_IN_USE,
      message:"Email ja existe",
    },404)
  }*/
  
}
/*
-falta redigita as classe dentro de swagger
-terminar a documentaçao no controller do usuario



::falta terminar o UsuariosController, auth e refatorar as paginas web
::depois replicar para os novos modulos, disto os novos modulos


  verifique* deixar o mesmo mensagem no Swagger com message no dto exemplo
  entrar nas classs de swagger e verificar se as mensagem e nome estão correto
  o certo seria ja usar o enum, apos isso verificar se os endpis estão funcionado e
  fazendo o que e pra ser feito



  *** pensar, se for enviado um metodo POST, posso retornar dentro do ok
  ou o ok deve ser usando somente por metodo GET

*/