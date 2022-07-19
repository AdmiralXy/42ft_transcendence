import { Status } from '../../user/enums/status.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserStatusDto {
  @IsNotEmpty()
  status: Status;
}
