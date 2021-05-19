import  Image  from '../../entities/image.entity';
import {MigrationInterface, QueryRunner, Table, getConnection} from "typeorm";
export class createImage1621383559463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'images',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  isNullable: false,
                },
      
                {
                  name: 'url',
                  type: 'text',
                  isNullable: false,
                },
                {
                  name: 'key',
                  type: 'text',
                  isNullable: true,
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Image)
      .execute();
      await queryRunner.dropTable('images');
    }

    


}
