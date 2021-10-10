import { Controller, Res, Render, Redirect, Headers, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IndexService } from './index.service'
import { message } from '@shared/enum'
import { 
GetAuthVerifyIdToken200Swagger,
GetAuthVerifyIdToken404TokenInvalidSwagger
} from './swagger/' 

@ApiTags('firebase')
@Controller('firebase')
export class IndexController {

  constructor(private readonly service: IndexService) {}

  @Get('/page/sign-up')
  @Render('sign-up.hbs')
  signUp() {
    return;
  }

  @Get('/page/sign-in')
  @Render('sign-in.hbs')
  signIn() {
    return;
  }

  @Get('/page/auth/home')
  @Render('home.hbs')
  home() {
    return;
  }

  @Get('/auth/revoke-refresh-token')
  public async revokeRefreshTokens(@Headers('Authorization') token: string) {
    return await this.service.revokeRefreshTokens(token)
  }

  @Get('/auth/verify-token')
  public async verifyToken(@Headers('Authorization') token: string) {
    return await this.service.verifyToken(token)
  }

  @Get('/auth/get-user-by-uid/:uid')
  public async getUserByUid(@Param('uid') uid: string, @Headers('Authorization') token: string) {
    return await this.service.getUserByUid(uid, token)
  }

  @Get('/auth/get-user-by-email/:email')
  public async getUserByEmail(@Param('email') email: string, @Headers('Authorization') token: string) {
    return await this.service.getUserByEmail(email, token)
  }

  @Get('/public/check-user-exists-by-uid/:uid')
  public async checkUserExistsByUid(@Param('uid') uid: string) {
    return await this.service.checkUserExistsByUid(uid)
  }

  @Get('/public/check-user-exists-by-email/:email')
  public async checkUserExistsByEmail(@Param('email') email: string) {
    return await this.service.checkUserExistsByEmail(email)
  }

  @Delete('/auth')
  public async delete(@Headers('Authorization') token: string) {
    return await this.service.deleteUser(token)
  }

}

/*
  @ApiOperation({ summary: 'verificar token do usuario' })
  @ApiResponse({
    status: 200,
    description: 'Token valido',
    type: GetAuthVerifyIdToken200Swagger
  })
  @ApiResponse({
    status: 404,
    description: message.TOKEN_INVALID,
    type: GetAuthVerifyIdToken404TokenInvalidSwagger
  })
*/