import { Controller, Headers, Param, Get, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@lib/exception/http-exception.filter';
import { OK } from '@lib/exception/http-status-ok';
import { HttpStatusOkInterceptor } from '@lib/exception/http-status-ok.interceptor';
import { code, message } from '@root/src/lib/enum';
import { FirebaseService } from './firebase.service';
import { CheckUserExistsMapper } from './mapper/check-user-exists-by-email.mapper';

@ApiTags('firebase')
@Controller('firebase')
export class FirebaseController {
  constructor(
    private readonly service: FirebaseService,
    private checkUserExistsMapper: CheckUserExistsMapper,
  ) {}

  @Get('/auth/revoke-refresh-token')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Destruir o teken' })
  public async revokeRefreshTokens(@Headers('Authorization') token: string) {
    await this.service.revokeRefreshTokens(token);
    return await new OK([], code.TOKEN_REVOKE_WITH_SUCCESS);
  }

  @Get('/auth/verify-token')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Verificar se o token existe ou esta valido' })
  public async verifyToken(@Headers('Authorization') token: string) {
    await this.service.verifyToken(token);
    return await new OK([], code.VALID_TOKEN);
  }

  @Get('/auth/get-user-by-uid/:uid')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Obter informação privada do usuario por uid' })
  public async getUserByUid(
    @Param('uid') uid: string,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.service.getUserByUid(uid, token);
    return await new OK([user], code.USER_FOUND);
  }

  @Get('/auth/get-user-by-email/:email')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Obter informação privada do usuario por email' })
  public async getUserByEmail(
    @Param('email') email: string,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.service.getUserByEmail(email, token);
    return await new OK([user], code.USER_FOUND, message.USER_FOUND);
  }

  @Get('/public/user-display-by-email/:email')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({
    summary: 'Obter informação publica de qualquer usuario por email',
  })
  public async userDisplayByEmail(@Param('email') email: string) {
    const user = await this.service.userDisplayByEmail(email);
    const dto = this.checkUserExistsMapper.toDto(user);
    return await new OK([dto], code.USER_FOUND);
  }

  @Delete('/auth')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Deletar o usuario passando o token' })
  public async delete(@Headers('Authorization') token: string) {
    await this.service.deleteUser(token);
    return await new OK([], code.SUCCESSFULLY_DELETED_USER);
  }
}
