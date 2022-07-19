import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MaxLength(2000)
  code: string;

  @IsNotEmpty()
  @MaxLength(2000)
  type: string;
}
