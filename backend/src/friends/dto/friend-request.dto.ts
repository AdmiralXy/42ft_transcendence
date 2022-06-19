import { IsNotEmpty, Length } from 'class-validator';

export class FriendRequestDto {
  @IsNotEmpty()
  sender: number;

  @IsNotEmpty()
  receiver: number;
}
