import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { IntraAPI } from './api/intra.api';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { randomUUID } from 'crypto';
import { GoogleAPI } from './api/google.api';
import { InterfaceAPI } from './api/interface.api';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private intraAPI: IntraAPI,
    private googleAPI: GoogleAPI,
  ) {}

  async login(code: string, type: string) {
    if (type === 'intra') {
      return this.loginApi(code, this.intraAPI);
    } else if (type === 'google') {
      return this.loginApi(code, this.googleAPI);
    } else {
      throw new BadRequestException('Invalid type.enum.ts!');
    }
  }

  async loginApi(code: string, interfaceAPI: InterfaceAPI) {
    let userFromApi, userFromDb;
    try {
      const access_token = (await interfaceAPI.exchangeCodeToToken(code))
        .access_token;
      userFromApi = await interfaceAPI.getUserInformation(access_token);
    } catch (error) {
      throw new BadRequestException('Application code is expired or invalid!');
    }
    const newUser = new CreateUserDto();
    newUser.login = userFromApi.login ? userFromApi.login : userFromApi.id;
    newUser.username = 'Guest ' + randomUUID().substring(0, 15 - 6);
    try {
      userFromDb = await this.userService.findByLogin(newUser.login);
    } catch (error) {
      userFromDb = await this.userService.create(newUser);
    }
    const payload = { id: userFromDb.id, login: userFromDb.login };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 5960,
    };
  }
}
