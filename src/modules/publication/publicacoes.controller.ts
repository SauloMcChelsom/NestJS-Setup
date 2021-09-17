import { Controller, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'

import { PublicacoesService } from './publicacoes.service'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'

@Controller('publicacoes')
export class PublicacoesController {

  constructor(private readonly service: PublicacoesService) {}

  @Post()
  public async save(@Body() create: CreateDto) {
    return await this.service.save(create);
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

  @Get('feed/:usuarios')
  public async feed(@Param('id') id: string) {
    return await this.service.feed(id);
  }

}
