import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  AfterLoad,
  ManyToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Topic } from './topic.entity';
import { Comment } from './comments.entity';
import { S3Helper } from '@src/utils/S3Helper';
import { User } from './user.entity';
import 'reflect-metadata';
@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, { createForeignKeyConstraints: true })
  @Column({ type: 'varchar' })
  author: User;

  @Column()
  description: string;

  @Column({ type: 'text' })
  imageStorage?: string;

  imageStorageUrl?: string;

  @AfterLoad()
  async load() {
    //this.imageStorageUrl = await new S3Helper().getUrl(this.imageStorage);
  }

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(
    () => Topic,
    topic => topic.category,
  )
  topics?: Topic[];

  // @OneToMany(
  //   () => Comment,
  //   comment => comment.category,
  // )
  // comments?: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
