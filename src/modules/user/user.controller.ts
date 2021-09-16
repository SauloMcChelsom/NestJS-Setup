import { Controller, UseFilters, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateNewUserDto } from './dto/create-new-user.dto'
import { CreatedUserSwagger } from './swagger/created.user.swagger'
import { BabRequestUserSwagger } from './swagger/bad-request.user.swagger'
import { ConflictUserSwagger } from './swagger/conflict.user.swagger'
import { UserService } from './user.service'
import { Client, code  } from '../../exception/http-exception.filter'

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
    type: CreatedUserSwagger
  })
  @ApiResponse({
    status: 400, 
    description: 'Parametros ou propriedades, informados errados ou inexistentes',
    type :BabRequestUserSwagger
  })
  @ApiResponse({
    status: 409, 
    description: 'Duplicidade de valor unico no banco de dados',
    type :ConflictUserSwagger
  })
  public async save(@Body() create: CreateNewUserDto) {
    return await this.service.save(create);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateDto) {
    return await this.service.update(id, updateDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Delete()
  public async deleteTodosUsuarios() {
    return await this.service.deleteTodosUsuarios();
  }

  @Get()
  public async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Get('/check-if-user-exists/:email')
  public async checkIfUserExistsByEmail(@Param('email') email: string) {
    return await this.service.checkIfUserExistsByEmail(email);
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

