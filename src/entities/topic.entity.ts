import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Comment } from './comments.entity';

@Entity('topics')
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({type: 'mediumtext'})
  textBody: string;

  @Column()
  imageStorage: string;

  @Column({ default: true })
  isActive: boolean;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: null })
  seedingId: number;
}
