import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { IntraAPI } from './api/intra.api';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { randomUUID } from 'crypto';
import { GoogleAPI } from './api/google.api';
import { InterfaceAPI } from './api/interface.api';
import { TwoFactorAuthenticationService } from '../two-factor-authentication/two-factor-authentication.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly intraAPI: IntraAPI,
    private readonly googleAPI: GoogleAPI,
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}

  async login(code: string, type: string) {
    if (type === 'intra') {
      return this.loginApi(code, this.intraAPI);
    } else if (type === 'google') {
      return this.loginApi(code, this.googleAPI);
    } else {
      throw new BadRequestException('Invalid API type!');
    }
  }

  async findUserById(id: number) {
    return await this.userService.findOne(id);
  }

  async loginApi(code: string, interfaceAPI: InterfaceAPI) {
    let userFromApi, userFromDb;
    try {
      const access_token = (await interfaceAPI.exchangeCodeToToken(code))
        .access_token;
      console.log(access_token);
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
    if (userFromDb.is_tfa_enabled) {
      throw new HttpException(
        {
          user: payload,
          message: 'Two-factor authentication is enabled',
        },
        400,
      );
    }
    await this.userService.updateLoggedIn(userFromDb.id);
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 5960,
    };
  }

  async loginTwoFactorAuthentication(id: number, tfa_token: string) {
    const isValid = await this.twoFactorAuthenticationService.validateToken(
      tfa_token,
      id,
    );
    if (!isValid) {
      throw new BadRequestException('Invalid two-factor authentication token');
    }
    const userFromDb = await this.userService.findOne(id);
    const payload = { id: userFromDb.id, login: userFromDb.login };
    await this.userService.updateLoggedIn(userFromDb.id);
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 5960,
    };
  }
}
