import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PageSegmentsService } from './page-segments.service'
import { CreateFollowPageDto } from './dto/createNewPage.dto'
import { UpdateDto  } from './dto/update.dto'

@ApiTags('page-segments')
@Controller('page-segments')
export class PageSegmentsController {

  constructor(private readonly service: PageSegmentsService) {}

  @ApiOperation({ summary: 'Começar a serguir esta pagina' })
  @Post('/auth')
  public async save(@Body() body: CreateFollowPageDto, @Headers('Authorization') token: string) { 
    return await this.service.save(body, token);
  }
  
  @ApiOperation({ summary: 'Todos usuario que segue esta pagina por id' })
  @Get('/auth/page/:id')
  public async findByIdPage(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByIdPage(id, token);
  }

  @ApiOperation({ summary: 'Paginas que usuario segue por id' })
  @Get('/auth/user/:id')
  public async findByIdUser(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByIdUser(id, token);
  }

  @ApiOperation({ summary: 'Seguir a pagina' })
  @Post('/auth/follow')
  public async followPage(@Body() body: CreateFollowPageDto, @Headers('Authorization') token: string) {
    return await this.service.followPage(body, token);
  }

  @ApiOperation({ summary: 'Atualizar nome da pagina por id' })
  @Put('/auth/:id')
  public async update(@Body() body: UpdateDto, @Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.update(body, id, token);
  }
}
