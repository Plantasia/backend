import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1605879828481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'userDescription',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'isActive',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'quarentineNum',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
