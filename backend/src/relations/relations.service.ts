import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from '../friends/entities/friend-request.entity';
import { Repository } from 'typeorm';
import { Blacklist } from '../blacklist/entities/blacklist.entity';
import { Status } from '../friends/enums/status.enum';

@Injectable()
export class RelationsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(Blacklist)
    private readonly blacklistRepository: Repository<Blacklist>,
  ) {}

  async isBlacklisted(id: number, blockId: number) {
    const blacklist = await this.blacklistRepository.count({
      where: [{ blocker: { id }, blocked: { id: blockId } }],
    });
    return blacklist > 0;
  }

  async isFriends(id: number, friendId: number) {
    const request = await this.friendRequestRepository.count({
      where: [
        { sender: { id }, receiver: { id: friendId }, status: Status.ACCEPTED },
        { sender: { id: friendId }, receiver: { id }, status: Status.ACCEPTED },
      ],
      relations: ['receiver', 'sender'],
    });
    return request > 0;
  }

  async removePendingRequests(id: number, friendId: number) {
    const requests = await this.friendRequestRepository.find({
      where: [
        { sender: { id }, receiver: { id: friendId }, status: Status.PENDING },
        { sender: { id: friendId }, receiver: { id }, status: Status.PENDING },
      ],
      relations: ['receiver', 'sender'],
    });
    await this.friendRequestRepository.remove(requests);
  }
}
