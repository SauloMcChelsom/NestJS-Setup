import { Controller, Version, UseGuards, Headers, Param, Get, Delete } from '@nestjs/common'
import { UseInterceptors, UseFilters } from '@nestjs/common'

import { JwtAuthAccessTokenGuard } from '@shared/guard/jwt-auth.guard'
import { JwtAuthRefreshTokenGuard } from '@shared/guard/refresh-token.guard'
import { RolesGuard } from '@shared/guard/roles.guard'
import { UserMachinePropertyGuard } from '@shared/guard/user-machine-property.guard'
import { hasRoles } from '@shared/decorator/roles.decorator'
import { Error } from '@shared/response/error.response'
import { Success } from '@shared/response/success.response'
import { OK } from '@shared/response/ok'
import { Role } from '@shared/enum'


import { code, message } from '@root/src/shared/enum'
import { JwtFirebaseModel } from '@model/jwt-firebase/jwt-firebase.model'

import { FirebaseMapper } from './mapper/index.mapper'
import { FirebaseService } from './firebase.service'
import { CreateUserFirebase } from '@root/src/shared/interfaces'

@Controller('firebase')
export class FirebaseController {
  constructor(
    private readonly jwtFirebaseModel: JwtFirebaseModel,
    private toMapper:FirebaseMapper,
    private firebaseService:FirebaseService
  ) {}

  @Get('/revoke-refresh-token')
  @Version('1/private')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async revokeRefreshTokens(@Headers('Authorization') token: string) {
    await this.jwtFirebaseModel.revokeRefreshTokens(token)

    let user =  await this.jwtFirebaseModel.findUserByUid(token)
    this.firebaseService.revokeToken(user.uid)
    return await new OK([], code.TOKEN_REVOKE_WITH_SUCCESS)
  }

  @Get('/verify-token')
  @Version('1/private')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async verifyToken(@Headers('Authorization') token: string) {
    await this.jwtFirebaseModel.verifyToken(token)
    return await new OK([], code.VALID_TOKEN);
  }

  @Get('/get-user-by-uid/:uid')
  @Version('1/private')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async getUserByUid(
    @Param('uid') uid: string,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.jwtFirebaseModel.getUserByUid(uid, token).then(res => this.toMapper.privateUserProfile(res))
    return await new OK([user], code.USER_FOUND)
  }

  @Get('/get-user-by-email/:email')
  @Version('1/private')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async getUserByEmail(
    @Param('email') email: string,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.jwtFirebaseModel.getUserByEmail(email, token).then(res => this.toMapper.privateUserProfile(res))
    return await new OK([user], code.USER_FOUND, message.USER_FOUND)
  }

  @Get('/user-display-by-email/:email')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async userDisplayByEmail(@Param('email') email: string) {
    const user = await this.jwtFirebaseModel.userDisplayByEmail(email).then(res => this.toMapper.privateUserProfile(res))
    return await new OK([user], code.USER_FOUND);
  }

  @Get('/sign-in-with-token-firebase/:uid')
  @Version('1/private')
  @UseFilters(Error)
  public async signInWithTokenFirebase(@Param('uid') uid: string, @Headers('Authorization') token: string) {
    const user = await this.jwtFirebaseModel.getUserByUid(uid, token).then(res => this.toMapper.privateUserProfile(res))
    return  await this.firebaseService.signIn(user).then(token => this.toMapper.login(token))
  }

}
