import { Controller, Post, Body, UseGuards, Request, Get, UseInterceptors, UsePipes, ValidationPipe, Put, Delete, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private configService: ConfigService,
    ) { }



    @UseGuards(LocalAuthGuard)
    @Post('login')
    async postLogin(@Request() req) {
  
        return this.authService.login(req.user);
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() request) {
        return  {id:'1', email:'ss@', dateOfBirth:'27/10', firstName:'ss', lastName:'sse'}
    }
}
