import { IsNotEmpty, Length } from 'class-validator';

export class FriendRequestDto {
  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  receiverId: number;
}
