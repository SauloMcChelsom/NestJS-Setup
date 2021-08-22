import { Controller, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common';

import { CreateDto } from './dto/create.dto'

import { UpdateUserDto  } from './dto/update-user.dto'

import { IndexService } from './index.service'

@Controller('cadastrar-novo-usuario')
export class IndexController {

  constructor(private readonly service: IndexService) {}

  @Post()
  public async save(@Body() create: CreateDto) {
    return await this.service.save(create);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto);
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

}
