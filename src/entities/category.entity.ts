import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity('categories')
export class Category extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  authorLogin: string;

  @Column({default: ' '})
  authorSlug:string;

  @Column()
  description: string;

  @Column({ default: '' })
  imageStorage: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Topic,
    topic => topic.category,
  )
  topics: Topic[];
}
