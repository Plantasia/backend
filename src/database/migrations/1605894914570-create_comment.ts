import { Comment } from '@entities/comments.entity';
import { getConnection, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createComment1605894914570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'bodyText',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'deleted',
            type: 'boolean',
            isNullable: true,
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
            
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Comment)
    .execute();

    await queryRunner.dropTable("comments")
  }
}
