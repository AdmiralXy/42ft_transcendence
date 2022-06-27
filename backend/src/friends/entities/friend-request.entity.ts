import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Status } from '../enums/status.enum';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @IsNotEmpty()
  @ManyToOne(() => User)
  @JoinColumn()
  receiver: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
