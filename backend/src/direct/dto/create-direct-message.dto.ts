import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDirectMessageDto {
  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  receiverId: number;

  @IsNotEmpty()
  @MaxLength(20)
  text: string;
}
