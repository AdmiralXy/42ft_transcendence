import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class LoginTwoFactorAuthenticationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @MaxLength(2000)
  tfa_token: string;
}
