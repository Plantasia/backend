import { Category } from "@entities/category.entity";import { Topic } from "@entities/topic.entity";
import { User } from "@entities/user.entity";
import { internet, random } from "faker";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import CategorySeed from "../seeders/category-seed";
import TopicsSeed from "../seeders/topics-seed";


export class TopicSeeding1615210339481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const t1 = new Topic()
        const u1 = await User.findOne("1631146a-f555-478a-826f-7c4f27b2550f")
        const cat1 = await Category.findOne("0443e4d2-d48c-4429-8e4c-00fe0fcdf733")
    
        t1.category = cat1
        t1.imageStorage =internet.avatar()
        t1.name = "Cactáceas, quanta água usar?"
        t1.user =u1
        t1.textBody = random.words()
        
        await getRepository(Topic).save(t1)
  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
           await getConnection()
           .createQueryBuilder()
           .delete()
           .from(Topic)
           .execute();
       
    }

}
