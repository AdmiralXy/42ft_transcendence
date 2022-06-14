import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from '../app/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  async login(@Request() req) {
    return this.authService.login(req.body.code);
  }

  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
