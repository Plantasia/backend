import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  BaseEntity,
  DeleteDateColumn,
  Generated,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Topic } from './topic.entity';
import { Comment } from './comments.entity';
import Image from './image.entity'

@Entity('users')
export class User extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: 'USER' })
  role: string;

  @JoinColumn()
  @OneToOne(
    () => Image,
    {
      lazy: true,
      nullable: true
    }
  )
  public avatar?: Image

  @Column()
  email: string;


 @Column({default: null})
 seedingId:number

  @Column()
  password: string;

  @Column({ default: 0 })
  quarentineNum: number;

  @Column({ default: false })
  isAdmin: boolean

  @Column({ default: "logout"})
  tokenLogout: string;

  @Column({ default: ""})
  recoverToken: string;
  
  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @OneToMany(
    () => Topic,
    topic => topic.user,
  )
  topics: Topic[];


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;


}
