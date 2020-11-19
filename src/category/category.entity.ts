import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Topic } from '../topics/topic.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
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

  @OneToMany(()=>Topic, topic=>topic.category)
  topics:Topic[];
}
