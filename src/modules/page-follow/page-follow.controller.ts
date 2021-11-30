import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PageFollowService } from './page-follow.service'
import { CreateNewPageDto } from './dto/createNewPage.dto'
import { UpdateDto  } from './dto/update.dto'

@ApiTags('page-follow')
@Controller('page-follow')
export class PageFollowController {

  constructor(private readonly service: PageFollowService) {}

  @ApiOperation({ summary: 'Criar uma pagina' })
  @Post('/auth')
  public async save(@Body() create: CreateNewPageDto, @Headers('Authorization') token: string) { 
    return await this.service.save(create, token);
  }
  
  @ApiOperation({ summary: 'Buscar por id da pagina' })
  @Get('/auth/page/:id')
  public async findByIdPage(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByIdPage(id, token);
  }

  @ApiOperation({ summary: 'Buscar por id do usuario' })
  @Get('/auth/user/:id')
  public async findByIdUser(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByIdUser(id, token);
  }

  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  @Put('/auth/:id')
  public async update(@Body() body: UpdateDto, @Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.update(body, id, token);
  }
}
