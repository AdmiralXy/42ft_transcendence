import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Status } from '../enums/status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 55 })
  login: string;

  @Column('varchar', { unique: true, length: 15 })
  username: string;

  @Column({ nullable: true })
  public tfa_secret?: string;

  @Column({ default: false })
  public is_tfa_enabled: boolean;

  @Column('timestamp', { nullable: true })
  logged_at: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.OFFLINE,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  get image(): string {
    return this.id + '.png';
  }
}
