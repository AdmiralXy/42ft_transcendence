import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Blacklist } from './entities/blacklist.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepository: Repository<Blacklist>,
    private userService: UserService,
  ) {}

  async create(id: number, createBlacklistDto: CreateBlacklistDto) {
    await this.userService.findOne(createBlacklistDto.id);
    const blockId = createBlacklistDto.id;
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

  async isBlacklisted(id: number, blockId: number) {
    const blacklist = await this.blacklistRepository.count({
      where: [{ blocker: { id }, blocked: { id: blockId } }],
    });
    return blacklist > 0;
  }
}
