import { IsNotEmpty, MaxLength } from 'class-validator';

export class TwoFactorAuthenticationCodeDto {
  @IsNotEmpty()
  @MaxLength(20000)
  code: string;
}
