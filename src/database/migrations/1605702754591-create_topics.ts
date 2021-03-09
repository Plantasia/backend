import { Topic } from '@entities/topic.entity';
import { getConnection, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTopics1605702754591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'topics',
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
            name: 'textBody',
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
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: true,
           
          },

          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: true,
           
          },{
            name: 'deleted_at',
            type: 'datetime',
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
    .from(Topic)
    .execute();

    await queryRunner.dropTable("topics")

  }
}
