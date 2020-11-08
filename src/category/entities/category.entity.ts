 import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

 @Entity()
  export class Category {
  @PrimaryGeneratedColumn()
  id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    author: string;

    @Column()
    imageStorage: string;

    @Column({default:true})
    isActive: boolean;
   }
