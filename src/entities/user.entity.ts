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
  bio: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  deleted: boolean;

  @Column({ default: 0 })
  quarentineNum: number;

  @Column({default:0})
  changedEmail:boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  isAdmin: boolean

  @Column({ default: "logout"})
  tokenLogout: string;

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
