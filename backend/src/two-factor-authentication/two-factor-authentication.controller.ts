import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { Response } from 'express';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { TwoFactorAuthenticationCodeDto } from './dto/two-factor-authentication-code.dto';
import { UserService } from '../user/user.service';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UserService,
  ) {}

  @Post('generate')
  async generate(@Res() response: Response, @CurrentUser() user) {
    if ((await this.twoFactorAuthenticationService.status(user.id)).enabled) {
      throw new BadRequestException(
        'Two-factor authentication is already enabled',
      );
    }
    const { otpAuthUrl } =
      await this.twoFactorAuthenticationService.generateSecret(user);

    return await this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpAuthUrl,
    );
  }

  @Post('turn-on')
  async turnOn(
    @CurrentUser() user,
    @Body() twoFactorAuthenticationCodeDto: TwoFactorAuthenticationCodeDto,
  ) {
    if ((await this.twoFactorAuthenticationService.status(user.id)).enabled) {
      throw new BadRequestException(
        'Two-factor authentication is already enabled',
      );
    }
    const isCodeValid = await this.twoFactorAuthenticationService.validateToken(
      twoFactorAuthenticationCodeDto.code,
      user.id,
    );
    if (!isCodeValid) {
      throw new BadRequestException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(user.id);
  }

  @Post('turn-off')
  async turnOff(
    @CurrentUser() user,
    @Body() twoFactorAuthenticationCodeDto: TwoFactorAuthenticationCodeDto,
  ) {
    if (!(await this.twoFactorAuthenticationService.status(user.id)).enabled) {
      throw new BadRequestException(
        'Two-factor authentication is already disabled',
      );
    }
    const isCodeValid = await this.twoFactorAuthenticationService.validateToken(
      twoFactorAuthenticationCodeDto.code,
      user.id,
    );
    if (!isCodeValid) {
      throw new BadRequestException('Wrong authentication code');
    }
    await this.usersService.turnOffTwoFactorAuthentication(user.id);
  }

  @Get()
  status(@CurrentUser() user) {
    return this.twoFactorAuthenticationService.status(user.id);
  }
}
