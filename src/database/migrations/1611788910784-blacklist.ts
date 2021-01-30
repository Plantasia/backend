import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class blacklist1611788910784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'blacklist',
              columns: [
              
                {
                  name: 'token',
                  type: 'text',
                  isNullable: false,
                }
                
              ],
            }),
          );
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
