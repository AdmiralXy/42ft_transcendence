import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Ban } from './entities/ban.entity';
import { Mute } from './entities/mute.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Mute)
    private readonly muteRepository: Repository<Mute>,
    @InjectRepository(Ban)
    private readonly banRepository: Repository<Ban>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.groupRepository.findOneBy({
      name: createGroupDto.name,
    });
    if (group)
      throw new BadRequestException([
        `Group with name ${createGroupDto.name} already exists.`,
      ]);
    return await this.groupRepository.save({
      name: createGroupDto.name,
      owner: { id: createGroupDto.ownerId },
    });
  }

  findAll() {
    return this.groupRepository.find();
  }

  async findOne(userId: number, id: number) {
    const group = await this.groupRepository.findOne({
      where: {
        id,
      },
      relations: [
        'owner',
        'users',
        'admin_list',
        'invite_list',
        'ban_list',
        'mute_list',
      ],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (!group.users.find((user) => user.id === userId)) {
      throw new BadRequestException('You are not joined to this group.');
    }
    return group;
  }

  async join(userId: number, id: number, password: string) {
    const group = await this.groupRepository.findOne({
      where: {
        id,
      },
      relations: [
        'users',
        'admin_list',
        'invite_list',
        'ban_list',
        'mute_list',
      ],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (!group.users.find((user) => user.id === userId)) {
      if (
        group.mode === 'private' &&
        !group.invite_list.find((user) => user.id === userId)
      ) {
        throw new BadRequestException('You are not invited to this group.');
      } else if (
        group.mode === 'protected' &&
        !(await bcrypt.compare(password, group.password))
      ) {
        throw new BadRequestException('Password is incorrect.');
      } else {
        const user = new User();
        user.id = userId;
        group.users.push(user);
        await this.groupRepository.save(group);
      }
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepository.findOneBy({ id });
    if (group.mode === 'private') {
      group.password =
        updateGroupDto.password.length > 0
          ? await bcrypt.hash(updateGroupDto.password, 10)
          : group.password;
    } else {
      group.password = null;
    }
    group.mode = updateGroupDto.mode;
    return this.groupRepository.save(group);
  }

  async remove(id: number) {
    const group = await this.groupRepository.findOneBy({ id });
    return this.groupRepository.remove(group);
  }

  async addAdmin(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['admin_list'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (!group.admin_list.some((admin) => admin.id === userId)) {
      const user = new User();
      user.id = userId;
      group.admin_list.push(user);
      return await this.groupRepository.save(group);
    }
  }

  async removeAdmin(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['admin_list'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (group.admin_list.some((admin) => admin.id === userId)) {
      group.admin_list = group.admin_list.filter(
        (admin) => admin.id !== userId,
      );
      return await this.groupRepository.save(group);
    }
  }

  async addToInviteList(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['invite_list'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (!group.invite_list.some((invited) => invited.id === userId)) {
      const user = new User();
      user.id = userId;
      group.invite_list.push(user);
      return await this.groupRepository.save(group);
    }
  }

  async removeFromInviteList(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['invite_list'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (group.invite_list.some((invited) => invited.id === userId)) {
      group.invite_list = group.invite_list.filter(
        (invite) => invite.id !== userId,
      );
      return await this.groupRepository.save(group);
    }
  }

  async addToBanList(id: number, userId: number, seconds: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['ban_list', 'ban_list.user'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (!group.ban_list.some((ban) => ban.user.id === userId)) {
      const user = new User();
      user.id = userId;
      group.ban_list.push(new Ban(user, seconds));
      return await this.groupRepository.save(group);
    }
  }

  async removeFromBanList(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['ban_list', 'ban_list.user'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (group.ban_list.some((ban) => ban.user.id === userId)) {
      const banToRemove = group.ban_list.find(
        (mute) => mute.user.id === userId,
      );
      return await this.banRepository.remove(banToRemove);
    }
  }

  async addToMuteList(id: number, userId: number, seconds: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['mute_list', 'mute_list.user'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (!group.mute_list.some((mute) => mute.user.id === userId)) {
      const user = new User();
      user.id = userId;
      group.mute_list.push(new Mute(user, seconds));
      return await this.groupRepository.save(group);
    }
  }

  async removeFromMuteList(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['mute_list', 'mute_list.user'],
    });
    if (!group) throw new NotFoundException('Group not found.');
    if (group.mute_list.some((mute) => mute.user.id === userId)) {
      const muteToRemove = group.mute_list.find(
        (mute) => mute.user.id === userId,
      );
      return await this.muteRepository.remove(muteToRemove);
    }
  }
}
