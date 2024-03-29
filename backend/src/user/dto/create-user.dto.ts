import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 55)
  login: string;

  @IsNotEmpty()
  @Length(3, 15)
  username: string;
}
