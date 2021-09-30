import { Controller, Param, Get, Post, Body, Put, Delete, Query } from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { 
  GetUser200Swagger,
  GetUser404NotFoundUserSwagger,
  GetUserGetUserByEmail200Swagger,
  GetUserGetUserByEmail404NotFoundUserSwagger,
  GetUserGetUserByUid200Swagger,
  GetUserGetUserByUid404NotFoundUserSwagger,
  PostUser200Swagger,
  PostUser400ProvidersUserIsInvalidSwagger,
  PostUser409EmailAlreadyInUseSwagger,
  PostUser409UidAlreadyInUseSwagger,
  PutUser200Swagger,
  PutUser404NotFoundUserSwagger
} from './swagger/' 

import { CreateNewUserDto, UpdateUserDto } from './dto'
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
    type: PostUser200Swagger
  })
  @ApiResponse({
    status: 409,
    description: message.EMAIL_ALREADY_IN_USE,
    type: PostUser409EmailAlreadyInUseSwagger
  })
  @ApiResponse({
    status: 408,
    description: message.UID_ALREADY_IN_USE,
    type: PostUser409UidAlreadyInUseSwagger
  })
  @ApiResponse({
    status: 400,
    description: message.PROVIDERS_USER_IS_INVALID,
    type: PostUser400ProvidersUserIsInvalidSwagger
  })
  public async save(@Body() create: CreateNewUserDto) {
    return await this.service.save(create);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: GetUser200Swagger
  })
  @ApiResponse({
    status: 404,
    description: message.NOT_FOUND_USER,
    type: GetUser404NotFoundUserSwagger
  })
  public async findAll() {
    return this.service.findAll();
  }

  @Get('/get-user-by-uid/:uid')
  @ApiOperation({ summary: 'Buscar usuario por uid' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: GetUserGetUserByUid200Swagger
  })
  @ApiResponse({
    status: 404,
    description: message.NOT_FOUND_USER,
    type: GetUserGetUserByUid404NotFoundUserSwagger
  })
  public async getUserByUid(@Param('uid') uid: string) {
    return await this.service.getUserByUid(uid);
  }

  @Get('/get-user-by-email/:email')
  @ApiOperation({ summary: 'Buscar usuario por email' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: GetUserGetUserByEmail200Swagger
  })
  @ApiResponse({
    status: 404,
    description: message.NOT_FOUND_USER,
    type: GetUserGetUserByEmail404NotFoundUserSwagger
  })
  public async getUserByEmail(@Param('email') email: string) {
    return await this.service.getUserByEmail(email);
  }

  @Put(':uid')
  @ApiOperation({ summary: 'Atualizar usuario por uid' })
  @ApiResponse({
    status: 200,
    description: 'Usuario atualizado com sucesso',
    type: PutUser200Swagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: PutUser404NotFoundUserSwagger
  })
  public async update(@Param('uid') uid: string, @Body() updateDto:UpdateUserDto) {
    return await this.service.updateUserByUid(uid, updateDto);
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