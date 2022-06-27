import { IsNotEmpty, MaxLength } from 'class-validator';
import { Mode } from '../enums/mode.enum';

export class UpdateGroupDto {
  @IsNotEmpty()
  @MaxLength(20)
  mode: Mode;

  @MaxLength(200000)
  password: string;
}
