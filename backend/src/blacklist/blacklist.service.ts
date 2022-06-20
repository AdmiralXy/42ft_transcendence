import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Blacklist } from './entities/blacklist.entity';
import {RelationsService} from "../relations/relations.service";

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepository: Repository<Blacklist>,
    private readonly userService: UserService,
    private readonly relationsService: RelationsService,
  ) {}

  async create(id: number, createBlacklistDto: CreateBlacklistDto) {
    await this.userService.findOne(createBlacklistDto.id);
    const blockId = createBlacklistDto.id;
    const isFriends = await this.relationsService.isFriends(id, blockId);
    if (isFriends) {
      throw new BadRequestException('You cannot block a friend.');
    }
    await this.relationsService.removePendingRequests(id, blockId);
    const blacklisted = await this.blacklistRepository.findOne({
      where: [{ blocker: { id }, blocked: { id: blockId } }],
    });
    if (blacklisted) {
      throw new BadRequestException('You have already blocked this user.');
    }
    return this.blacklistRepository.save({
      blocker: { id },
      blocked: { id: blockId },
    });
  }

  async findAll(id: number) {
    return await this.blacklistRepository
      .find({
        where: [{ blocker: { id } }],
        relations: ['blocked'],
      })
      .then((res) => res.map((r) => r.blocked));
  }

  async remove(id: number, blockId: number) {
    const blacklist = await this.blacklistRepository.findOne({
      where: [{ blocker: { id }, blocked: { id: blockId } }],
    });
    if (!blacklist) {
      throw new BadRequestException('You have not blocked this user.');
    }
    return this.blacklistRepository.remove(blacklist);
  }
}
