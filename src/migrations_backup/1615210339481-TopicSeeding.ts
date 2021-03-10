
import { Topic } from "@entities/topic.entity";
import {getConnection,createConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Category } from '@entities/category.entity';
import { User } from '@entities/user.entity';
import {internet, random} from 'faker';
import TopicsSeed from '../database/seeders/topics-seed'

export class TopicSeeding1615210339481 implements MigrationInterface {

    public async up(): Promise<void> {
        const topics = await TopicsSeed()

        await getRepository(Topic).save(topics)
       
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
           await getConnection()
           .createQueryBuilder()
           .delete()
           .from(Topic)
           .execute();
    }

}
