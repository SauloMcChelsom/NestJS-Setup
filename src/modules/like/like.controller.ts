import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'

import { LikeService } from './like.service'

import { LikeDto } from './dto/like.dto'

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('like')
@Controller('like')
export class LikeController {

  constructor(private readonly service: LikeService) {}

  @ApiOperation({ summary: 'Curtir uma publicação' })
  @Post()
  public async likePublication(@Body() body: LikeDto, @Headers('Authorization') token: string) {
    return await this.service.likePublication(body, token);
  }
}
