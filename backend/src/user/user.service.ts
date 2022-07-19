import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0)
      throw new BadRequestException('User already registered.');
    return await this.usersRepository.save({ ...createUserDto });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async findByLogin(login: string) {
    const user = await this.usersRepository.findOneBy({ login });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      return await this.usersRepository.save({
        id,
        ...updateUserDto,
      });
    } catch (e) {
      throw new BadRequestException(['This username is already in use.']);
    }
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.usersRepository.update(userId, {
      tfa_secret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.usersRepository.update(userId, {
      is_tfa_enabled: true,
    });
  }

  async turnOffTwoFactorAuthentication(userId: number) {
    return this.usersRepository.update(userId, {
      tfa_secret: null,
      is_tfa_enabled: false,
    });
  }
}
