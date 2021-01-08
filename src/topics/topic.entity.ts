import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { Comment } from '../comments/comments.entity';

@Entity('topic')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  textBody: string;

  @Column({ default: '--------' })
  imageStorage: string;

  @Column({ default: 0 })
  reaction: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => User,
    user => user.topics,
  )
  user: User;

  @ManyToOne(
    () => Category,
    category => category.topics,
  )
  category: Category;

  @OneToMany(
    () => Comment,
    comments => comments.topic,
  )
  comments: Comment[];
  topic: Category;
}
