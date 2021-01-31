import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Topic } from './topic.entity';
import { Comment } from './comments.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  userDescription: string;

  @Column({ default: 'usuario' })
  role: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  isActive: boolean;

  @Column({ default: 0 })
  quarantineNum: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  isAdmin: boolean

  @Column()
  passwordLogout: string;

  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @OneToMany(
    () => Topic,
    topic => topic.user,
  )
  topics: Topic[];
}
