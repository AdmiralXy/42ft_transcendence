import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from '../app/decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { LoginTwoFactorAuthenticationDto } from './dto/login-two-factor-authentication.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.code, loginDto.type);
  }

  @Post('login-2fa')
  @SkipAuth()
  async loginTfa(@Body() loginTfaDto: LoginTwoFactorAuthenticationDto) {
    return this.authService.loginTwoFactorAuthentication(
      loginTfaDto.id,
      loginTfaDto.tfa_token,
    );
  }

  @Get('user')
  async user(@Request() req) {
    return req.user;
  }
}
