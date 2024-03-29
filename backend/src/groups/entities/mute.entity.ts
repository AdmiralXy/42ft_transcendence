import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Group } from './group.entity';

@Entity()
export class Mute {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Group, (group) => group.ban_list)
  group: Group;

  @IsNotEmpty()
  @Column('timestamp')
  expire_at: Date;

  constructor(user: User, seconds: number) {
    this.user = user;
    this.expire_at = new Date(new Date().getTime() + seconds * 1000);
  }
}
