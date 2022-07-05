import { Controller, Post, Body, Get, Headers, Param, UseGuards, UseInterceptors, Version, UseFilters } from '@nestjs/common'

import { UserMachinePropertyInterceptor } from 'src/shared/interceptor/user-machine-property.interceptor'
import { JwtAuthAccessTokenGuard } from '@shared/guard/jwt-auth.guard';
import { UserMachinePropertyGuard } from '@shared/guard/user-machine-property.guard'
import { Error } from '@shared/response/error.response'
import { Success } from '@shared/response/success.response'
import { hasRoles } from '@shared/decorator/roles.decorator'
import { code, Role } from '@shared/enum'

import { AuthMapper } from './mapper/index.mapper'
import { CreateUserDTO, RefreshTokenDTO, UserDTO, CreateUserGoogleProviderDTO } from './dto/index.dto'
import { AuthService } from './auth.service'
import { JwtAuthRefreshTokenGuard } from '@root/src/shared/guard/refresh-token.guard';
import { OK } from '@root/src/shared/response/ok';

@Controller('auth')
export class AuthController {

    constructor(
        private service: AuthService,
        private toMapper:AuthMapper
    ){}

    @Post('create-new-account')
    @Version('1/public')
    @UseFilters(Error)
    public async createNewAccount(@Body() user: CreateUserDTO) {
        return await this.service.createNewAccount(user).then(user => this.toMapper.create(user))
    }

    @Post('create-new-google-auth-provider')
    @Version('1/public')
    @UseFilters(Error)
    public async createNewAccountWithGoogleAuthProvider(@Body() user: CreateUserGoogleProviderDTO) {
        return await this.service.createNewAccountWithGoogleAuthProvider(user).then(user => this.toMapper.create(user))
    }

    @Post('create-new-google-email-password')
    @Version('1/public')
    @UseFilters(Error)
    public async createNewAccountWithGoogleEmailPassword(@Body() user: CreateUserGoogleProviderDTO) {
        return await this.service.createNewAccountWithGoogleEmailPassword(user).then(user => this.toMapper.create(user))
    }

    @Post('sign-in')
    @Version('1/public')
    @UseInterceptors(UserMachinePropertyInterceptor)
    @UseFilters(Error)
    public async signIn(@Body() user: UserDTO) {
        return await this.service.signIn(user).then(token => this.toMapper.login(token))
    }

    @Get('sign-out')
    @Version('1/private')
    @hasRoles(Role.USER, Role.ADMIN)
    @UseGuards(JwtAuthAccessTokenGuard, UserMachinePropertyGuard)
    @UseFilters(Error)
    public async singOut(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return await this.service.revokeToken(body.refresh_token).then(() => this.toMapper.revokeToken())
    }

    @Get('refresh-token')
    @Version('1/private')
    @hasRoles(Role.USER, Role.ADMIN)
    @UseGuards(UserMachinePropertyGuard)
    @UseFilters(Error)
    public async refreshToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return await this.service.refreshToken(body.refresh_token).then(token => this.toMapper.refreshToken(token))
    }

    @Get('revoke-token')
    @Version('1/private')
    @hasRoles(Role.USER, Role.ADMIN)
    @UseGuards(JwtAuthAccessTokenGuard, UserMachinePropertyGuard)
    @UseFilters(Error)
    public async revokeToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return await this.service.revokeToken(body.refresh_token).then(() => this.toMapper.revokeToken())
    }

    @Post('valid-token')
    @Version('1/private')
    @UseGuards(JwtAuthAccessTokenGuard, UserMachinePropertyGuard)
    @UseFilters(Error)
    public async validToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return new OK([], code.VALID_TOKEN)
    }

    @Get('google-auth-provider/active-account/:uid')
    @Version('1/public')
    @UseFilters(Error)
    public async googleAuthProviderActiveAccount(@Param('uid') uid: string) {
        const user = await this.service.getUserByUid(uid)
        return await this.service.activeAccount(user)
    }
}