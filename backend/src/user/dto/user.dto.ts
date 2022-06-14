import { User } from '../entity/user.entity';

export class UserDto {
  login: string;
  username: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.login = user.login;
    this.username = user.username;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
