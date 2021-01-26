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
} from 'typeorm';
import { Topic } from './topic.entity';
import { User } from '@entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  reaction: string;

  @Column()
  disable: boolean;

  @Column({ default: 0 })
  hasParentComment: boolean;

  @Column({ default: '' })
  idParentComment: string;

  @CreateDateColumn()
  created_at: Date;

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
}
