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

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.groupRepository.findOneBy({
      name: createGroupDto.name,
    });
    if (group)
      throw new BadRequestException([
        `Group with name ${createGroupDto.name} already exists.`,
      ]);
    return this.groupRepository.save({
      name: createGroupDto.name,
      owner: { id: createGroupDto.ownerId },
    });
  }

  findAll() {
    return this.groupRepository.find();
  }

  async findOne(id: number, userId: number, password: string) {
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
        !(await group.comparePassword(password))
      ) {
        throw new BadRequestException('Password is incorrect.');
      } else {
        // add user to group
        const user = new User();
        user.id = userId;
        group.users.push(user);
        await this.groupRepository.save(group);
      }
    }
    return group;
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
}
