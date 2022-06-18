import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { FriendRequest } from './entity/friend-request.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
  ) {}

  async sendRequest(id: number, friendId: number) {
    await this.friendRequestRepository.save({
      senderId: id,
      receiverId: friendId,
    });
  }

  async add(id: number, friendId: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['friends'],
    });
    const friend = await this.userRepository.findOneBy({ id: friendId });
    if (!friend) throw new NotFoundException('State not found.');
    user.friends.push(friend);
    return await this.userRepository.save({
      ...user,
    });
  }

  async findAll(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['friends'],
    });
    return user.friends;
  }

  async remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
