import { Category } from './category.entity';
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

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  textBody: string;


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


  @ManyToOne(
    ()=> Category,
    category=>category.comments
  )
  category: Category

  @UpdateDateColumn()
  updated_at: boolean;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
