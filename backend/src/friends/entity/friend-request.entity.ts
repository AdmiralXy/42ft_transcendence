import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entity/user.entity';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @OneToOne(() => User)
  @JoinColumn()
  @Column('integer', { nullable: false })
  senderId: number;

  @IsNotEmpty()
  @OneToOne(() => User)
  @JoinColumn()
  @Column('integer', { nullable: false })
  receiverId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
