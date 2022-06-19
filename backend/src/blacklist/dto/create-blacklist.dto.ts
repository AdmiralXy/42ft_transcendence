import { IsNotEmpty } from 'class-validator';

export class CreateBlacklistDto {
  @IsNotEmpty()
  id: number;
}
