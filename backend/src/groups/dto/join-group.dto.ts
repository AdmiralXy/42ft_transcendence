import { IsNotEmpty, MaxLength } from 'class-validator';

export class JoinGroupDto {
  @MaxLength(200)
  password: string;
}
