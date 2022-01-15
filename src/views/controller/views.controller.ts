import { Controller, Render, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('')
@Controller('')
export class ViewsController {

  constructor(){}

  @Get('/login')
  @Render('pages/login.hbs')
  @ApiOperation({ summary: 'Pagina de login, logar usando o gmail' })
  public login() {
    return;
  }

  @Get('/sign-up')
  @Render('pages/sign-up.hbs')
  @ApiOperation({ summary: 'Pagina de cadastrar ou cadastrar usando o gmail' })
  public signUp() {
    return;
  }

  @Get('/sign-in')
  @Render('pages/sign-in.hbs')
  @ApiOperation({ summary: 'Pagina de login ou entrar usando o gmail' })
  public signIn() {
    return;
  }

  @Get('/home')
  @Render('pages/home.hbs')
  @ApiOperation({ summary: 'Pagina home do usuario logado' })
  public home() {
    return;
  }

}