import { Controller, Post, Body, Get, Headers, UseGuards, UseInterceptors, Version } from '@nestjs/common'

import { UserMachinePropertyInterceptor } from 'src/shared/interceptor/user-machine-property.interceptor'
import { JwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { UserMachinePropertyGuard } from '@shared/guard/user-machine-property.guard'
 
import { AuthMapper } from './mapper/auth.mapper'
import { CreateUserDTO, RefreshTokenDTO, UserDTO } from './dto/auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private toMapper:AuthMapper
    ){}

    @Post('create-new-account')
    public async create(@Body() user: CreateUserDTO) {
        return await this.authService.create(user).then(user => this.toMapper.create(user))
    }
    @Post('login')
    @Version('1/public')
    @UseInterceptors(UserMachinePropertyInterceptor)
   
    public async login(@Body() user: UserDTO) {
        return await this.authService.login(user).then(token => this.toMapper.login(token))
    }

    @UseGuards(UserMachinePropertyGuard)
    @Get('refresh-token')
    public async refreshToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.authService.validateRefreshToken(body.refresh_token, token)
        return await this.authService.refreshToken(body.refresh_token).then(token => this.toMapper.refreshToken(token))
    }

    @UseGuards(JwtAuthGuard, UserMachinePropertyGuard)
    @Get('revoke-token')
    public async revokeToken(@Body() body: RefreshTokenDTO, @Headers('authorization') token:any){
        await this.authService.validateRefreshToken(body.refresh_token, token)
        return await this.authService.revokeToken(body.refresh_token).then(() => this.toMapper.revokeToken())
    }
}