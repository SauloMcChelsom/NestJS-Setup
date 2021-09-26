import { Controller, Res, Render, Redirect, Headers, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'

import { JwtUtilityService } from '../../shared/jwt/jwt.service'
import { IndexService } from './index.service'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'


@Controller('auth')
export class IndexController {

  constructor(
    private readonly service: IndexService,
    private readonly jwtUtility: JwtUtilityService,
  ) {}

  @Get('sign-up')
  @Render('sign-up')
  signUp() {
    return;
  }

  
  @Get('sign-in')
  @Render('sign-in')
  signIn() {
    return;
  }

  @Get('home')
  @Render('home')
  home() {
    return;
  }

  @Post('/createUser')
  public async createUser(@Body() data:any) {
    return await this.service.createUser(data)
  }

  @Post('/createCustomToken')
  public async createCustomToken(@Body() data:any) {
    return await this.service.createCustomToken(data.uid)
  }

  @Get('/revokeRefreshTokens')
  public async revokeRefreshTokens(@Headers('Authorization') token: string) {
    const id = token.replace('Bearer ', '');
    return await this.service.revokeRefreshTokens(id)
  }

  @Get('/verifyIdToken')
  public async verifyIdToken(@Headers('Authorization') token: string) {
    const id = token.replace('Bearer ', '');
    return await this.service.verifyIdToken(id)
  }

  @Get('/user/:id')
  public async getUser(@Param('id') id: string,) {
    return await this.service.getUserByEmail(id)
  }

  @Get('/user/:email')
  public async getUserByEmail(@Param('email') email: string) {
    return await this.service.getUserByEmail(email)
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return await []
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await []
  }

}
