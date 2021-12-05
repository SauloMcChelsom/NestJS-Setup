import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PageSegmentsService } from './page-segments.service'
import { CreateFollowPageDto } from './dto/createNewPage.dto'

@ApiTags('page-segments')
@Controller('page-segments')
export class PageSegmentsController {

  constructor(private readonly service: PageSegmentsService) {}
  
  @ApiOperation({ summary: 'Todos os usuarios da pagina' })
  @Get('/auth/page/:id')
  public async findByIdPage(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByIdPage(id, token);
  }

  @ApiOperation({ summary: 'Todas as paginas que o usuario segue' })
  @Get('/auth/user/:id')
  public async findByIdUser(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByIdUser(id, token);
  }

  @ApiOperation({ summary: 'Seguir a pagina' })
  @Post('/auth/follow')
  public async followPage(@Body() body: CreateFollowPageDto, @Headers('Authorization') token: string) {
    return await this.service.followPage(body, token);
  }
}
/**
 * -------nova funcionalidade-----
 * 
 * -quantas pessoas te seguem
 * 
 * -quantas pessoas te seguiram. ex: os que te seguem e os que pararam
 * 
 * -quantas pessoas pararam de te seguir
 * 
 * -quantas pessoas voltaram a te seguir
 * 
 * -quantas pessoas voltaram a te seguir por periodo, ex: no mês de out-dez x pessoas voltaram
 * 
 * -quantas pessoas pararam a te seguir por periodo, ex: no mês de out-dez x pessoas voltaram
 * 
 */
