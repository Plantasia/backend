import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { Topic } from './topic.entity';
import { User } from '../entities/user.entity';

@Entity('logsSeeding')
export class LogsSeeding extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  runnedAllMigrations: boolean;

  constructor(runnedAllMigrations: boolean) {
    super();
    this.runnedAllMigrations = true;
  }
}
