import { Controller, Post, Body, Get, Headers, UseGuards, UseInterceptors, Version } from '@nestjs/common'

import { UserMachinePropertyInterceptor } from 'src/shared/interceptor/user-machine-property.interceptor'
import { JwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { UserMachinePropertyGuard } from '@shared/guard/user-machine-property.guard'
 
import { AuthMapper } from './mapper/index.mapper'
import { CreateUserDTO, RefreshTokenDTO, UserDTO } from './dto/index.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(
        private service: AuthService,
        private toMapper:AuthMapper
    ){}

    @Post('create-new-account')
    public async createNewAccount(@Body() user: CreateUserDTO) {
        return await this.service.createNewAccount(user).then(user => this.toMapper.create(user))
    }

    @Post('sign-in')
    @Version('1/public')
    @UseInterceptors(UserMachinePropertyInterceptor)
    public async signIn(@Body() user: UserDTO) {
        return await this.service.signIn(user).then(token => this.toMapper.login(token))
    }

    @UseGuards(JwtAuthGuard, UserMachinePropertyGuard)
    @Get('sign-out')
    public async singOut(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return await this.service.revokeToken(body.refresh_token).then(() => this.toMapper.revokeToken())
    }

    @UseGuards(UserMachinePropertyGuard)
    @Get('refresh-token')
    public async refreshToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return await this.service.refreshToken(body.refresh_token).then(token => this.toMapper.refreshToken(token))
    }

    @UseGuards(JwtAuthGuard, UserMachinePropertyGuard)
    @Get('revoke-token')
    public async revokeToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.service.validateRefreshToken(body.refresh_token, token)
        return await this.service.revokeToken(body.refresh_token).then(() => this.toMapper.revokeToken())
    }
}