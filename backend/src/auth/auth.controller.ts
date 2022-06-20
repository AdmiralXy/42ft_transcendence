import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from '../app/decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  async login(@Request() req) {
    return this.authService.login(req.body.code, req.body.type);
  }

  @Get('user')
  async user(@Request() req) {
    return req.user;
  }
}
