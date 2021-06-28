import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  DeleteDateColumn,
  JoinColumn,
  AfterLoad,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Comment } from './comments.entity';
import { S3Helper } from '@src/utils/S3Helper';

@Entity('topics')
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'mediumtext' })
  textBody: string;

  @Column({ default: '' })
  imageStorage?: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(
    () => User,
    user => user.topics,
  )
  user: User;

  @ManyToOne(
    () => Category,
    category => category.topics,
  )
  category: Category;

  @OneToMany(
    () => Comment,
    comments => comments.topic,
  )
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: null })
  seedingId: number;

  imageStorageUrl: string;

  @AfterLoad()
  async load() {
    if (!this.imageStorage) return;
    this.imageStorageUrl = await new S3Helper().getUrl(this.imageStorage);
    
  }
}
