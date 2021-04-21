import { Comment } from '../../entities/comments.entity';
import {
  getConnection,
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createComments1615387777376 implements MigrationInterface {
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
            name: 'textBody',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: true,
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

    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'categoryId',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'topicId',
        type: 'varchar',
        isNullable: false,
      }),
    );

    const fk_user_id = new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });

    const fk_topic_id = new TableForeignKey({
      columnNames: ['topicId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'topics',
      onDelete: 'CASCADE',
    });
 
    const fk_category_Id = new TableForeignKey({
      columnNames: ['categoryId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'CASCADE',
    });


    await queryRunner.createForeignKey('comments', fk_topic_id);
    await queryRunner.createForeignKey('comments', fk_user_id);
    await queryRunner.createForeignKey('comments', fk_category_Id);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .execute();

    await queryRunner.dropTable('comments');
  }
}
