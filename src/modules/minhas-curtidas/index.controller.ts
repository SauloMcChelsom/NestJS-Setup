import { Controller, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common';

import { CreateDto } from './dto/create.dto'

import { UpdateDto  } from './dto/update.dto'

import { CurtirDto  } from './dto/curtir.dto'

import { IndexService } from './index.service'

@Controller('minhas-curtidas')
export class IndexController {

  constructor(private readonly service: IndexService) {}

  @Post()
  public async save(@Body() create: CreateDto) {
    return await this.service.save(create);
  }

  @Post('/curtir')
  public async curtir(@Body() curtir: CurtirDto) {
    return await this.service.curtir(curtir);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return await this.service.update(id, updateDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.service.delete(id);
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
