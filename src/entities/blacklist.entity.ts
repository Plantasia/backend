import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Topic } from './topic.entity';
  
  @Entity('blacklist')
  export class Blacklist {
    @PrimaryGeneratedColumn('uuid')
     id: string;
    @Column()
    token: string;
  
  }
  