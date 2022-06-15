import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { IntraAPI } from './api/intra.api';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private intraAPI: IntraAPI,
  ) {}

  async login(code: string) {
    let userFromIntra;
    try {
      const access_token = (await this.intraAPI.exchangeCodeToToken(code))
        .access_token;
      userFromIntra = await this.intraAPI.getUserInformation(access_token);
    } catch (error) {
      const errors = { code: 'Code is expired or invalid.' };
      throw new HttpException(
        { message: 'Input data is invalid.', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    let user = await this.userService
      .findByLogin(userFromIntra.login)
      .catch(() => null);
    if (!user) user = await this.userService.create(userFromIntra.login);
    const payload = { login: user.login, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 5960,
    };
  }
}
