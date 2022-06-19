import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { FriendRequest } from './entity/friend-request.entity';
import { UserService } from '../user/user.service';
import { Status } from './enums/status.enum';
import { CreateFriendDto } from './dto/create-friend.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    private userService: UserService,
  ) {}

  async create(id: number, createFriendDto: CreateFriendDto) {
    await this.userService.findOne(createFriendDto.id);
    const friendId = createFriendDto.id;
    const sentRequest = await this.findBySenderAndReceiver(id, friendId);
    const pendingRequest = await this.findBySenderAndReceiver(friendId, id);
    if (sentRequest)
      throw new BadRequestException('You have already sent a friend request.');
    if (pendingRequest) {
      await this.friendRequestRepository.save({
        id: pendingRequest.id,
        status: Status.ACCEPTED,
      });
    } else {
      await this.friendRequestRepository.save({
        sender: {
          id: id,
        },
        receiver: {
          id: friendId,
        },
        status: Status.PENDING,
      });
    }
  }

  async findAll(userId: number) {
    const req1 = await this.friendRequestRepository
      .find({
        where: [{ sender: { id: userId }, status: Status.ACCEPTED }],
        relations: ['receiver', 'sender'],
      })
      .then((res) => res.map((r) => r.receiver));
    const req2 = await this.friendRequestRepository
      .find({
        where: [{ receiver: { id: userId }, status: Status.ACCEPTED }],
        relations: ['receiver', 'sender'],
      })
      .then((res) => res.map((r) => r.sender));
    return req1.concat(req2);
  }

  async remove(id: number, friendId: number) {
    const request = await this.friendRequestRepository.findOne({
      where: [
        { sender: { id }, receiver: { id: friendId }, status: Status.ACCEPTED },
        { sender: { id: friendId }, receiver: { id }, status: Status.ACCEPTED },
      ],
      relations: ['receiver', 'sender'],
    });
    if (!request) throw new NotFoundException('Friend request not found.');
    return await this.friendRequestRepository.remove(request);
  }

  async findBySenderAndReceiver(senderId: number, receiverId: number) {
    return await this.friendRequestRepository.findOne({
      relations: {
        sender: true,
        receiver: true,
      },
      where: {
        sender: {
          id: senderId,
        },
        receiver: {
          id: receiverId,
        },
      },
    });
  }
}
