import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
import { Mode } from '../enums/mode.enum';

export class UpdateGroupDto {
  @IsNotEmpty()
  @MaxLength(20)
  mode: Mode;

  @ValidateIf((o) => o.mode === Mode.PROTECTED)
  @IsNotEmpty()
  @MaxLength(200000)
  password: string;
}
