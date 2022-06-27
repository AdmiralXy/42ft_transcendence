import { User } from '../../user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Group } from './group.entity';

@Entity()
export class Ban {
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
}
