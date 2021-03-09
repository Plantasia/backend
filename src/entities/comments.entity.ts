import { userInfo } from 'os';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Topic } from './topic.entity';
import { User } from '../entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => User,
    user => user.comments,
  )
  user: User;

  @ManyToOne(
    () => Topic,
    topic => topic.comments,
  )
  topic: Topic;

  @UpdateDateColumn({ default: null })
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
