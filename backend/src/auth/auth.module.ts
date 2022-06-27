import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { IntraAPI } from './api/intra.api';
import { GoogleAPI } from './api/google.api';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [AuthService, JwtStrategy, IntraAPI, GoogleAPI],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
