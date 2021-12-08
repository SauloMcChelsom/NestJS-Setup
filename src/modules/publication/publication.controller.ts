import { Controller, Headers, Res, Redirect, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'

import { PublicationService } from './publication.service'

import { CreateNewPublicationDto } from './dto/create-new-publication.dto'
import { UpdatePublicationDto  } from './dto/update-publication.dto'

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('publication')
@Controller('publication')
export class PublicationController {

  constructor(private readonly service: PublicationService) {}

  @ApiOperation({ summary: 'Criar uma nova publicaçao' })
  @Post()
  public async createNewPublications(@Body() body: CreateNewPublicationDto, @Headers('Authorization') token: string) {
    return await this.service.createNewPublications(body, token);
  }

  @ApiOperation({ summary: 'Alterar o texto da minha publicaçao' })
  @Put(':id')
  public async updatePublication(@Param('id') id: string, @Body() body: UpdatePublicationDto, @Headers('Authorization') token: string) {
    return await this.service.updatePublication(id, body, token);
  }

  @Get(':id')
  public async publication(@Param('id') id: string) {
    return await this.service.publication(id);
  }

  @Get()
  public async feed() {
    return this.service.feed();
  }

  @Get(':query')
  public async search(@Param('query') query: string) {
    return await this.service.search(query);
  }

}
