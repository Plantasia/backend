import {Entity,Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import {Topic} from '../topics/topic.entity'

@Entity('users')
export default class User{

@PrimaryGeneratedColumn('uuid')
id:string;

@Column()
userDescription: string;

@Column()
role:string;

@Column()
avatar: string;

@Column()
email: string

@Column()
password: string;

@Column({default:true})
isActive: boolean;

@Column({default:0})
quarantineNum: number;

@CreateDateColumn()
created_at:Date;

@CreateDateColumn()
updated_at: Date;

@OneToMany(()=>Topic, topic=>topic.user)
topic: Topic[]

}