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

  @ApiOperation({ summary: 'Criar uma pagina' })
  @Post('/auth')
  public async save(@Body() create: CreateNewPageDto, @Headers('Authorization') token: string) { 
    return await this.service.save(create, token);
  }

  @ApiOperation({ summary: 'Buscar por nome da pagina' })
  @Get('/name/:page')
  public async findOne(@Param('page') page: string) {
    return await this.service.findOneByName(page);
  }

  @ApiOperation({ summary: 'Buscar por id da pagina' })
  @Get(':id')
  public async findOneById(@Param('id') id: string) {
    return await this.service.findOneById(id);
  }

  @ApiOperation({ summary: 'Buscar todas as paginas' })
  @Get()
  public async findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  @Put('/auth/:id')
  public async update(@Body() page: UpdateDto, @Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.update(page, id, token);
  }

  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  @Post('/follow')
  public async follow(@Headers('Authorization') token: string) { 
    return await this.service.follow(token);
  }
}
