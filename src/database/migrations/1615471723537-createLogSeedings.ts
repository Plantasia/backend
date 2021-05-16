import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createLogSeedings1615471723537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'logsSeeding',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isNullable: false,
            isGenerated: true,
          },
          {
            name: 'runnedAllMigrations',
            type: 'tinyint',
            isNullable: true,
            default: 0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
