import {Entity,Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, CreateDateColumn} from  'typeorm'
import { Category } from '../category/category.entity';
import User from '../user/user.entity';

@Entity('topics')
export  class Topic{

@PrimaryGeneratedColumn('uuid')
id:string;

@Column()
name: string;

@Column()
textBody: string;

@Column({default:'--------'})
imageStorage:string;

@Column({default:0})
reaction: number

@Column({default:true})
isActive:boolean

@ManyToOne(()=>Category, category=>category.topics)
category:Category

@CreateDateColumn()
created_at: Date;

@CreateDateColumn()
updated_at:Date

@ManyToOne(()=>User, user=> user.topic)
user:User;
}