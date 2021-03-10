import { Category } from "@entities/category.entity";
import { User } from "@entities/user.entity";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import AdminSeed from "../seeders/admin-seed";
import CategorySeed from "../seeders/category-seed";

export class insertCategoriesSeeding1615391128810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const categories = await CategorySeed()
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
