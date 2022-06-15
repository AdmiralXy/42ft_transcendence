import { User } from '../entity/user.entity';

export class UserDto {
  id: number;
  login: string;
  username: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.username = user.username;
    this.avatar = '/uploads/' + user.avatar;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
