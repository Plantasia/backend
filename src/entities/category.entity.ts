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
} from 'typeorm';
import { Topic } from './topic.entity';
import { Comment } from './comments.entity';
import { S3Helper } from '@src/utils/S3Helper';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  authorEmail: string;

  @Column({ default: '' })
  authorId: string;

  @Column()
  description: string;

  @Column()
  imageStorage: string;

  imageStorageUrl: string;

  @AfterLoad()
  async load() {
    this.imageStorageUrl = await new S3Helper().getUrl(this.imageStorage);
  }

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => Topic,
    topic => topic.category,
  )
  topics: Topic[];

  @OneToMany(
    () => Comment,
    comment => comment.category,
  )
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
