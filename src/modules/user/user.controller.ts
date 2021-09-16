import { Controller, UseFilters, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateNewUserDto } from './dto/create-new-user.dto'
import { CreateUserSuccessSwagger } from './swagger/create-user-success.swagger'
import { ErrorInputSwagger } from './swagger/error-input.swagger'
import { UserService } from './user.service'
import { Client, code  } from '../../exception/http-exception.filter'

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('user')
export class UsuariosController {
  
  constructor(private readonly service: UserService) {}
 
  @Post()
  @ApiOperation({ summary: 'Cadastrar um usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario cadastrado com sucesso',
    type: CreateUserSuccessSwagger
  })
  @ApiResponse({
    status: 400, 
    description: 'Bad Request.',
    type :ErrorInputSwagger
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

