import { Controller, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common';

import { validate, } from 'class-validator';

import { CreateUserDto } from './dto/create-user.dto'

import { UpdateUserDto  } from './dto/update-user.dto'

import { UserService } from './user.service'

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  public async save(@Body() createUserDto: CreateUserDto) {
    validate(createUserDto, { validationError: { target: false } });
    return await this.userService.save(createUserDto);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Delete()
  public async deleteTodosUsuarios() {
    return await this.userService.deleteTodosUsuarios();
  }

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

}
