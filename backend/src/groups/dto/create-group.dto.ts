import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
