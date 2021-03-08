import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            name: 'reaction',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'disable',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'hasParentComment',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'idParentComment',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'indexOrder',
            type: 'int',
            isNullable: true,
            isGenerated: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
          },

          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
