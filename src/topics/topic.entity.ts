import {Entity,Column, PrimaryGeneratedColumn, ManyToOne} from  'typeorm'
import { Category } from '../category/category.entity';

@Entity()
export  class Topic{

@PrimaryGeneratedColumn()
id:number;

@Column()
name: number;

@Column()
textBody: string;

@Column()
imageStorage:string;

@Column()
reaction: string;

@ManyToOne(()=>Category, category=>category.topics)
category:Category
}