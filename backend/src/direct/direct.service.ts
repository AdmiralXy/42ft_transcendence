import { Injectable } from '@nestjs/common';
import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectMessage } from './entities/direct-message.entity';
import { RelationsService } from '../relations/relations.service';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class DirectService {
  constructor(
    @InjectRepository(DirectMessage)
    private readonly directMessagesRepository: Repository<DirectMessage>,
    private readonly relationsService: RelationsService,
  ) {}

  async create(createDirectMessageDto: CreateDirectMessageDto) {
    const isFriends = await this.relationsService.isFriends(
      createDirectMessageDto.senderId,
      createDirectMessageDto.receiverId,
    );
    if (!isFriends) {
      throw new WsException('You are not friends.');
    }
    const res = await this.directMessagesRepository.save({
      text: createDirectMessageDto.text,
      sender: {
        id: createDirectMessageDto.senderId,
      },
      receiver: {
        id: createDirectMessageDto.receiverId,
      },
    });
    return this.directMessagesRepository.findOne({
      where: { id: res.id },
      relations: ['sender', 'receiver'],
    });
  }

  async findAll() {
    return `This action returns all direct`;
  }

  async join(id: number, friendId: number, client: Socket) {
    const isFriends = await this.relationsService.isFriends(id, friendId);
    if (!isFriends) {
      throw new WsException('You are not friends.');
    }
    client.join(id < friendId ? id + '-' + friendId : friendId + '-' + id);
    return await this.directMessagesRepository.find({
      where: [
        { sender: { id }, receiver: { id: friendId } },
        { sender: { id: friendId }, receiver: { id } },
      ],
      relations: ['sender', 'receiver'],
    });
  }
}
