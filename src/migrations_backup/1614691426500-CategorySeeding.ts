import { Category } from "@entities/category.entity";
import { User } from "@entities/user.entity";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import AdminSeed from "../database/seeders/admin-seed";
import CategorySeed from "../database/seeders/category-seed";

 const categories = CategorySeed()
export class CategorySeeding1614691426500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         
       await getRepository(Category).save(categories)
            
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

  
            await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .execute();
       
    }
}
