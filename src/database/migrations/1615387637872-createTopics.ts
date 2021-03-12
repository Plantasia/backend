import { Topic } from '@entities/topic.entity';
import { getConnection, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createTopics1615387637872 implements MigrationInterface {

  
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
                default:'now()'
               
              },
    
              {
                name: 'updated_at',
                type: 'datetime',
                isNullable: true,
                default:'now()'
               
              },{
                name: 'deleted_at',
                type: 'datetime',
                isNullable: true,
               
              },
              {
                name: 'seedingId',
                type: 'int',
                isPrimary:false,
                isUnique:true,
                generationStrategy:'increment',
                isGenerated:true
               
              },
              
              
            ],
          }),
        );
        
          await queryRunner.addColumn("topics", new TableColumn({
            name: "categoryId",
            type: "varchar",
            isNullable: false
           }));
    
           await queryRunner.addColumn("topics", new TableColumn({
            name: "userId",
            type: "varchar",
            isNullable:false
           }));
    
    
        
    
        await queryRunner.createForeignKey("topics",  new TableForeignKey({
          columnNames:["categoryId"],
          referencedColumnNames:["id"],
          referencedTableName:"categories",
          onDelete:"CASCADE"
        }))
    
        await queryRunner.createForeignKey("topics",  new TableForeignKey({
          columnNames:["userId"],
          referencedColumnNames:["id"],
          referencedTableName:"users",
          onDelete:"CASCADE"
        }))
      
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
    


