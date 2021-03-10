import { User } from "@entities/user.entity";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import UserSeed from '../database/seeders/user-seed';

var usersSeed = UserSeed()
 
export class UserSeeding1614691144370 implements MigrationInterface {
   
    public async up(queryRunner: QueryRunner): Promise<void> {
         
        await getRepository(User).save(usersSeed)
            
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

            await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("isAdmin = 1")
            .execute();
       
    }

}
