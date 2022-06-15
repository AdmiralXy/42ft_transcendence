import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        { message: 'User not found.' },
        HttpStatus.BAD_REQUEST,
      );
    return new UserDto(user);
  }

  async findByLogin(login: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ login });
    if (!user)
      throw new HttpException(
        { message: 'User not found.' },
        HttpStatus.BAD_REQUEST,
      );
    return new UserDto(user);
  }

  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user)
      throw new HttpException(
        { message: 'User not found.' },
        HttpStatus.BAD_REQUEST,
      );
    return new UserDto(user);
  }

  async create(login: string): Promise<UserDto> {
    const user = await this.findByLogin(login).catch(() => null);

    if (user) {
      const errors = { username: 'Login must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new User();
    newUser.login = login;
    newUser.username =
      'Guest #' +
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);
    newUser.avatar = 'default.png';

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedUser = await this.userRepository.save(newUser);
    return new UserDto(savedUser);
  }

  async update(id: number, data: any): Promise<UserDto> {
    const user = await this.findById(id);
    const updated = await this.userRepository
      .save({
        id: user.id,
        ...data,
      })
      .catch(() => {
        throw new HttpException(
          { message: 'Username already exists.' },
          HttpStatus.BAD_REQUEST,
        );
      });
    return new UserDto(updated);
  }
}
