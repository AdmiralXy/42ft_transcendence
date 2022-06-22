import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { IsNotEmpty, MaxLength } from 'class-validator';

@Entity()
export class DirectMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn()
  receiver: User;

  @Column('text')
  @MaxLength(20)
  @IsNotEmpty()
  text: string;

  @CreateDateColumn()
  created_at: Date;
}
