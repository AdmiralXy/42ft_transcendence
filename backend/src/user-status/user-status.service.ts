import { Injectable } from '@nestjs/common';
import { Status } from '../user/enums/status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  update(id: number, status: Status) {
    return this.userRepository.update(id, { status });
  }
}
