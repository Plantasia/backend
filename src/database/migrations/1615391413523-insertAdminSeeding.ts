import { User } from "@entities/user.entity";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import AdminSeed from "../seeders/user-seed";
const admins = AdminSeed()
export class insertAdminSeeding1615391413523 implements MigrationInterface {
   
    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await getRepository(User).save(admins)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for(let admin of admins){

            const adminId =admin
           await getConnection()
           .createQueryBuilder()
           .delete()
           .from(User)
           .where("id =:id",{id:admin.id})
           .execute();
       }
    }


}
