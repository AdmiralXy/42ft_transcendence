import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { UserService } from '../user/user.service';
import { Status } from './enums/status.enum';
import { CreateFriendDto } from './dto/create-friend.dto';
import { RelationsService } from '../relations/relations.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    private readonly userService: UserService,
    private readonly relationsService: RelationsService,
  ) {}

  async create(id: number, createFriendDto: CreateFriendDto) {
    await this.userService.findOne(createFriendDto.id);
    if (await this.relationsService.isBlacklisted(+id, +createFriendDto.id)) {
      throw new BadRequestException(
        'You cannot add a user that you have blocked.',
      );
    }
    const friendId = createFriendDto.id;
    const friendRequest = await this.relationsService.isFriends(id, friendId);
    if (friendRequest) {
      throw new BadRequestException('You are already friends.');
    }
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
    if (!request) throw new BadRequestException('Friend request not found.');
    return await this.friendRequestRepository.remove(request);
  }

  async findBySenderAndReceiver(senderId: number, receiverId: number) {
    return await this.friendRequestRepository.findOne({
      relations: { sender: true, receiver: true },
      where: {
        sender: { id: senderId },
        receiver: { id: receiverId },
      },
    });
  }
}
