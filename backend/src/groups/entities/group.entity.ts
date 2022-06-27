import {
  BeforeInsert,
  JoinTable,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Mode } from '../enums/mode.enum';
import { Ban } from './ban.entity';
import { Mute } from './mute.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 55 })
  name: string;

  @IsNotEmpty()
  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @Column({
    type: 'enum',
    enum: Mode,
    default: Mode.PUBLIC,
  })
  mode: Mode;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => User)
  @JoinTable()
  admin_list: User[];

  @ManyToMany(() => User)
  @JoinTable()
  invite_list: User[];

  @OneToMany(() => Ban, (ban) => ban.group)
  ban_list: Ban[];

  @OneToMany(() => Mute, (mute) => mute.group)
  mute_list: Mute[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    console.log(attempt, this.password);
    return await bcrypt.compare(attempt, this.password);
  }
}
