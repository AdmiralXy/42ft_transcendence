import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from '../app/app.module';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  @SkipAuth()
  async test() {
    return 'hello world';
  }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body.code);
  }

  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
