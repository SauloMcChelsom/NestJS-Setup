import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'
import { UpdateDto } from './dto/update.dto'

@ApiTags('comment')
@Controller('comment')
export class CommentController {

  constructor(private readonly service: CommentService) {}

  @ApiOperation({ summary: 'Buscar comentario por id do usuario' })
  @Get('user/:id')
  public async findByUserId(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByUserId(id, token);
  }

  @ApiOperation({ summary: 'Buscar comentario por id da publicacao' })
  @Get('publication/:id')
  public async findByPublicationId(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findByPublicationId(id, token);
  }

  @ApiOperation({ summary: 'Buscar comentario por id' })
  @Get(':id')
  public async findOneById(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.findOneById(id, token);
  }

  @ApiOperation({ summary: 'fazer um comentario' })
  @Post()
  public async createComment(@Body() body: CommentDto, @Headers('Authorization') token: string) {
    return await this.service.createComment(body, token);
  }

  @ApiOperation({ summary: 'Atualizar um comentario' })
  @Put(':id')
  public async updateComment(@Body() body: UpdateDto, @Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.updateComment(body, id, token);
  }

  @ApiOperation({ summary: 'Deletar um comentario' })
  @Delete(':id')
  public async deleteComment(@Body() body: UpdateDto, @Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.deleteComment(id, token);
  }
}
