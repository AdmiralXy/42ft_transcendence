import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Type } from '../enums/type.enum';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  player1: User;

  @ManyToOne(() => User)
  player2: User;

  @ManyToOne(() => User, { nullable: true })
  winner: User;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.PRIVATE,
  })
  type: Type;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
