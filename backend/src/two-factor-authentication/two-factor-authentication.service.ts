import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(private readonly usersService: UserService) {}

  async generateSecret(user: any) {
    const secret = authenticator.generateSecret();

    const otpAuthUrl = authenticator.keyuri(
      user.login,
      process.env.APP_NAME,
      secret,
    );

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpAuthUrl,
    };
  }

  public async pipeQrCodeStream(stream: Response, otpAuthUrl: string) {
    return toFileStream(stream, otpAuthUrl);
  }

  async status(id: number) {
    return await this.usersService.findOne(id).then((user) => {
      return {
        enabled: user.is_tfa_enabled,
      };
    });
  }

  async validateToken(tfa_token: string, id: number) {
    const user = await this.usersService.findOne(id);
    authenticator.options = {
      step: 30,
      window: 3,
    };
    return authenticator.check(tfa_token, user.tfa_secret);
  }
}
