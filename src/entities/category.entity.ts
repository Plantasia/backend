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
  DeleteDateColumn,
} from 'typeorm';
import { Topic } from './topic.entity';
import {Comment} from './comments.entity'

@Entity('categories')
export class Category extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: "" })
  authorEmail: string;

  @Column({default: ""})
  authorId:string;

  @Column()
  description: string;

  @Column({ default: "" })
  imageStorage: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => Topic,
    topic => topic.category,
  )
  topics: Topic[];

  @OneToMany(
    ()=> Comment,
     comment=> comment.category
    )
   comments: Comment[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}
