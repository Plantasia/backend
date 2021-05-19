import { Category } from '../../entities/category.entity';
import { getConnection, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCategories1621383670928  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },

          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'authorEmail',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'authorId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'imageStorage',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'isActive',
            type: 'tinyint',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'now()',
          },

          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: true,
            default: 'now()',
          },

          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.clearSqlMemory();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Category)
      .execute();

    await queryRunner.dropTable('categories');
  }
}
