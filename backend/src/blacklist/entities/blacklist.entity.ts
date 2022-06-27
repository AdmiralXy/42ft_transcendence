import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Blacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @ManyToOne(() => User)
  @JoinColumn()
  blocker: User;

  @IsNotEmpty()
  @ManyToOne(() => User)
  @JoinColumn()
  blocked: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
