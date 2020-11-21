import {Entity,Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToMany, ManyToOne} from 'typeorm';
import {Topic} from '../topics/topic.entity'
import User from '../user/user.entity';

@Entity()
export  class  Comments{

@PrimaryGeneratedColumn('uuid')
id:string;

@Column()
text: string;

@Column()
reaction:string;

@Column()
disable: boolean;

@Column({default:0})
hasParentComment: boolean;

@Column({default:'----------'})
idParentComment: string;

@CreateDateColumn()
created_at:Date;

@CreateDateColumn()
updated_at: Date;

@OneToMany(()=>Topic, topic=>topic.id)
topic: Topic;

@ManyToOne(()=>User, user=> user.id)
user:User;

}