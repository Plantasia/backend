
import { Category } from "@entities/category.entity";
import { Topic } from "@entities/topic.entity";
import { User } from "@entities/user.entity";
import { internet, random } from "faker";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import TopicsSeed from '../seeders/topics-seed'


export class insertTopicsSeeding1615391567083 implements MigrationInterface {

    public async up(): Promise<void> {
       
       
        var t16 = new Topic()
        t16.name = "Lugares mais baratos de São Paulo para comprar algas"
        t16.category = await  Category.findOne('fb7a1028-c0ae-4b79-9cdd-3f0556f8d558')
        t16.imageStorage =internet.avatar()
        t16.user =  await User.findOne("3b53cd76-692a-4a8d-a625-0e65f4ebf053")
        t16.textBody = random.words()
        var topic16 =await  getRepository(Topic)
  
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into("topics")
        .values([
            {
                id:t16.id,
                name:t16.name,
                imageStorage:t16.imageStorage,
                user:t16.user,
                textBody:t16.textBody,
                category:t16.category

                      }
        ])
        .execute()
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
           await getConnection()
           .createQueryBuilder()
           .delete()
           .from(Topic)
           .execute();
    }

}
