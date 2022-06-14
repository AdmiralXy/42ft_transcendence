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

  async findOneByLogin(login: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ login });

    return user ? new UserDto(user) : null;
  }

  async create(login: string): Promise<UserDto> {
    const user = await this.findOneByLogin(login);

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

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedUser = await this.userRepository.save(newUser);
    console.log(savedUser);
    return new UserDto(savedUser);
  }
}
