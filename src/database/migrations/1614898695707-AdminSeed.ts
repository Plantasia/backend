
import { User } from "@entities/user.entity";
import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import AdminSeed from "../seeders/admin-seed";

const admins = AdminSeed();
export class AdminSeed1614898695707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(User).save(admins)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for( let i=0; i<= admins.length;i++){

            const adminId =admins[i].id
           await getConnection()
           .createQueryBuilder()
           .delete()
           .from(User)
           .where("id =:id",{id:adminId})
           .execute();
       }
    }

}
