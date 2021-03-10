import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';
import { Topic } from './topic.entity';
import { Comment } from './comments.entity';

@Entity('users')
export class User extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  quarentineNum: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;


}
