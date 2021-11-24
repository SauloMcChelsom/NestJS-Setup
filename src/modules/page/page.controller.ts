import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PageService } from './page.service'
import { CreateNewPageDto } from './dto/createNewPage.dto'
import { UpdateDto  } from './dto/update.dto'

@ApiTags('page')
@Controller('page')
export class PageController {

  constructor(private readonly service: PageService) {}

  @Post('/auth')
  @ApiOperation({ summary: 'Criar uma pagina' })
  public async save(@Body() create: CreateNewPageDto, @Headers('Authorization') token: string) { 
    return await this.service.save(create, token);
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
