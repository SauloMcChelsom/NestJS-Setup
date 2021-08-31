import { Controller, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'

import { CurtidasService } from './curtidas.service'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'


@Controller('curtidas')
export class CurtidasController {

  constructor(private readonly service: CurtidasService) {}

  @Post()
  public async save(@Body() create: CreateDto) {
    return await this.service.curtir(create);
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

  @Get('usuario/:id')
  public async todasPublicacaoDoUsuario(@Param('id') id: string) {
    return await this.service.todasPublicacaoDoUsuario(id);
  }

  @Get('usuario/:usuario/publicacao/:publicacao')
  public async todasPublicacaoDoUsuarioPorPublicacao(@Param('usuario') usuario: string, @Param('publicacao') publicacao: string) {
    return await this.service.todasPublicacaoDoUsuarioPorPublicacao(usuario, publicacao);
  }
}
