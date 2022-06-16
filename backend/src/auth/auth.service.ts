import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { IntraAPI } from './api/intra.api';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private intraAPI: IntraAPI,
  ) {}

  async login(code: string) {
    let userFromIntra, user;
    try {
      const access_token = (await this.intraAPI.exchangeCodeToToken(code))
        .access_token;
      userFromIntra = await this.intraAPI.getUserInformation(access_token);
    } catch (error) {
      throw new BadRequestException('Intra42 code is expired or invalid!');
    }
    const newUser = new CreateUserDto();
    newUser.login = userFromIntra.login;
    newUser.username = 'Guest ' + randomUUID().substring(0, 15 - 6);
    try {
      user = await this.userService.findByLogin(userFromIntra.login);
    } catch (error) {
      user = await this.userService.create(newUser);
    }
    const payload = { id: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 5960,
    };
  }
}
