import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCategory1605697433254 implements MigrationInterface {
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
            name: 'author',
            type: 'text',
            isNullable: false,
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
