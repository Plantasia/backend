import { User } from "@entities/user.entity";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import UserSeed from '../seeders/user-seed';

export class insertUserSeeding1615390947602 implements MigrationInterface {

  
    public async up(queryRunner: QueryRunner): Promise<void> {
        var usersSeed = UserSeed()
        
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
