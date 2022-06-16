import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @Length(3, 15)
  username: string;
}
