import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 55 })
  login: string;

  @Column('varchar', { unique: true, length: 15 })
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  get image(): string {
    return this.id + '.png';
  }
}
