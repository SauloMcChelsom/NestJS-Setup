import { Controller, Param, Get, Post, Body, Put, Delete, Query } from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { message } from '@shared/enum'
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
  PutUser404NotFoundUserSwagger,
  DelUser404NotFoundUserSwagger,
  DelUser200Swagger,
  GetUserCheckUserExistsByEmail200Swagger,
  GetUserCheckUserExistsByEmail404NotFoundUserSwagger
} from './swagger/' 
import { CreateNewUserDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'

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

  @Get('/check-user-exists-by-email/:email')
  @ApiOperation({ summary: 'Buscar usuario por email' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: GetUserCheckUserExistsByEmail200Swagger
  })
  @ApiResponse({
    status: 404,
    description: message.NOT_FOUND_USER,
    type: GetUserCheckUserExistsByEmail404NotFoundUserSwagger
  })
  public async checkUserExistsByEmail(@Param('email') email: string) {
    return await this.service.checkUserExistsByEmail(email);
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

  @Delete(':uid')
  @ApiOperation({ summary: 'Deletar usuarios por uid' })
  @ApiResponse({
    status: 200,
    description: 'Usuario deletado com sucesso',
    type: DelUser200Swagger
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario não encontrado',
    type: DelUser404NotFoundUserSwagger
  })
  public async deleteUserByUid(@Param('uid') uid: string) {
    return await this.service.deleteUserByUid(uid);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar todos usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Todos os usuario foram deletados',
    type:   DelUser200Swagger
  })
  public async deleteTodosUsuarios() {
    return await this.service.deleteTodosUsuarios();
  }
}