import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'
import { UpdateDto } from './dto/update.dto'

@ApiTags('comment')
@Controller('comment')
export class CommentController {

  constructor(private readonly service: CommentService) {}

  @ApiOperation({ summary: 'fazer um comentario' })
  @Post()
  public async makeComment(@Body() body: CommentDto, @Headers('Authorization') token: string) {
    return await this.service.makeComment(body, token);
  }

  @ApiOperation({ summary: 'Atualizar um comentario' })
  @Put(':id')
  public async updateComment(@Body() body: UpdateDto, @Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.service.updateComment(body, id, token);
  }

  
}
