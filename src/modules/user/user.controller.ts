import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { 
  UserPostSwagger,
  User409EmailSwagger,
  User409UidSwagger,
  User400ProvidersSwagger,
  UserGetSwagger,
  User404UserSwagger,
  UserGetUidSwagger
} from './swagger/' 

import { CreateNewUserDto } from './dto'
import { UserService } from './user.service'
import { message } from '@shared/enum'

@ApiTags('user')
@Controller('user')
export class UsuariosController {
  constructor(private readonly service: UserService) {}
 
  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuario' })
  @ApiResponse({
    status: 201,
    description: message.USER_REGISTERED,
    type: UserPostSwagger
  })
  @ApiResponse({
    status: 409,
    description: message.EMAIL_ALREADY_IN_USE,
    type: User409EmailSwagger
  })
  @ApiResponse({
    status: 408,
    description: message.UID_ALREADY_IN_USE,
    type: User409UidSwagger
  })
  @ApiResponse({
    status: 400,
    description: message.PROVIDERS_USER_IS_INVALID,
    type: User400ProvidersSwagger
  })
  public async save(@Body() create: CreateNewUserDto) {
    return await this.service.save(create);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserGetSwagger
  })
  @ApiResponse({
    status: 404,
    description: message.NOT_FOUND_USER,
    type: User404UserSwagger
  })
  public async findAll() {
    return this.service.findAll();
  }

  @Get('/get-user-by-uid/:uid')
  @ApiOperation({ summary: 'Buscar usuario por uid' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserGetUidSwagger
  })
  @ApiResponse({
    status: 404,
    description: message.NOT_FOUND_USER,
    type: User404UserSwagger
  })
  public async getUserByUid(@Param('uid') uid: string) {
    return await this.service.getUserByUid(uid);
  }

  @Get('/get-user-by-email/:email')
  @ApiOperation({ summary: 'Buscar usuario por email' })
  /*@ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserGetCheckIfUserExistsEmailSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })*/
  public async getUserByEmail(@Param('email') email: string) {
    return await this.service.getUserByEmail(email);
  }

  @Put(':id')
  /*@ApiOperation({ summary: 'Atualizar usuario por id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario atualizado com sucesso',
    type: UserPutInfoSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })*/
  public async update(@Param('id') id: string, @Body() updateDto:any) {
    return await this.service.update(id, updateDto);
  }

  @Delete(':id')
  /*@ApiOperation({ summary: 'Deletar usuarios por id' })
  @ApiResponse({
    status: 202,
    description: 'Usuario deletado com sucesso',
    type: UserDeletedIdInfoSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: UserGetNotFoundSwagger
  })*/
  public async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Delete()
  /*@ApiOperation({ summary: 'Deletar todos usuarios' })
  @ApiResponse({
    status: 202,
    description: 'Todos os usuario foram deletados',
    type: UserDeletedInfoSwagger
  })*/
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

  user.GET.@id.swagger.ts
  user.DEL.@id.swagger.ts
  user.POST.swagger.ts
  user.GET.__check-if-user-exists__@email.swagger.ts
  user.200.swagger.ts
  user.404.swagger.ts
  user.409.swagger.ts



  coseguimos fazer schema funciona agora é fazer para todos o poblema e que vai duplicacae
  muito tenta fazer algo generico, ou tentar colocar no dto


*/