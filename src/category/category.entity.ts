import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Topic } from '../topics/topic.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id:number;

  @Column()
  name: string;

  @Column()
  author:string;

  @Column()
  description: string;

  @Column()
  imageStorage: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date

  @OneToMany(()=>Topic, topic=>topic.category)
  topics:Topic[];
}
