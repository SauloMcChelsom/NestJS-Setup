import { Controller, Res, Render, Redirect, Headers, HttpStatus, Param, HttpCode, Header, Get, Query, Post, Body, Put, Delete } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { message } from '@shared/enum'
import { FirebaseService } from './firebase.service'

@ApiTags('firebase')
@Controller('firebase')
export class FirebaseController {

  constructor(private readonly service: FirebaseService){}

  @Get('/page/login')
  @Render('login.hbs')
  @ApiOperation({ summary: 'Pagina de login, logar usando o gmail' })
  public login() {
    return;
  }

  @Get('/page/sign-up')
  @Render('sign-up.hbs')
  @ApiOperation({ summary: 'Pagina de cadastrar ou cadastrar usando o gmail' })
  public signUp() {
    return;
  }

  @Get('/page/sign-in')
  @Render('sign-in.hbs')
  @ApiOperation({ summary: 'Pagina de login ou entrar usando o gmail' })
  public signIn() {
    return;
  }

  @Get('/page/auth/home')
  @Render('home.hbs')
  @ApiOperation({ summary: 'Pagina home do usuario logado' })
  public home() {
    return;
  }

  @Get('/auth/revoke-refresh-token')
  @ApiOperation({ summary: 'Destruir o teken' })
  public async revokeRefreshTokens(@Headers('Authorization') token: string) {
    return await this.service.revokeRefreshTokens(token)
  }

  @Get('/auth/verify-token')
  @ApiOperation({ summary: 'Verificar se o token existe ou esta valido' })
  public async verifyToken(@Headers('Authorization') token: string) {
    return await this.service.verifyToken(token)
  }

  @Get('/auth/get-user-by-uid/:uid')
  @ApiOperation({ summary: 'Obter informação privada do usuario por uid' })
  public async getUserByUid(@Param('uid') uid: string, @Headers('Authorization') token: string) {
    return await this.service.getUserByUid(uid, token)
  }

  @Get('/auth/get-user-by-email/:email')
  @ApiOperation({ summary: 'Obter informação privada do usuario por email' })
  public async getUserByEmail(@Param('email') email: string, @Headers('Authorization') token: string) {
    return await this.service.getUserByEmail(email, token)
  }

  @Delete('/auth')
  @ApiOperation({ summary: 'Deletar o usuario passando o token' })
  public async delete(@Headers('Authorization') token: string) {
    return await this.service.deleteUser(token)
  }

  @Get('/user-display-by-email/:email')
  @ApiOperation({ summary: 'Obter informação publica de qualquer usuario por email' })
  public async userDisplayByEmail(@Param('email') email: string) {
    return await this.service.userDisplayByEmail(email)
  }
}