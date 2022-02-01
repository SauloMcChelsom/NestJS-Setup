import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwt-auth.guard'
import { UID } from './uid.pipe'
import { Header } from './header.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Header(new UID()) uid) {
    return await this.authService.getuser(uid);
  }
}