import {Entity,Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import {Topic} from '../topics/topic.entity'

@Entity('users')
export  class User{

@PrimaryGeneratedColumn('uuid')
id:string;

@Column()
name: string;

@Column({default:''})
userDescription: string;

@Column()
role:string;

@Column({default:''})
avatar: string;

@Column()
email: string

@Column()
password: string;

@Column({default:0})
isActive: boolean;

@Column({default:0})
quarantineNum: number;

@CreateDateColumn()
created_at:Date;

@CreateDateColumn()
updated_at: Date;

@OneToMany(()=>Topic, topic=>topic.id)
topic: Topic;
/*
@OneToMany(()=>Comment, comment=> comment.user)
comments: Comment[]*/

}