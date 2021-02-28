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
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  authorLogin: string;

  @Column()
  authorSlug:string;

  @Column()
  description: string;

  @Column({default:0})
  qtdeTopics: number;
  

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
