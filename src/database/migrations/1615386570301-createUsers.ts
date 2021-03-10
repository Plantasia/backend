import { User } from '@entities/user.entity';
import { getConnection, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1615386570301 implements MigrationInterface {

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
                name: 'bio',
                type: 'text',
                isNullable: true,
              },
              {
                name: 'role',
                type: 'text',
                isNullable: true,
              },
    
              {
                name: 'email',
                type: 'text',
                isNullable: false,
              },
    
              {
                name: 'avatar',
                type: 'text',
                isNullable: true,
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
                default:true
              },
          
              {
                name: 'quarentineNum',
                type: 'int',
                isNullable: false,
                default:0
              },
              {
                name: 'isAdmin',
                type: 'boolean',
                isNullable: false,
                default:0
              },
              {
                name: 'tokenLogout',
                type: 'text',
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
              {
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
        .from(User)
        .execute();
    
        await queryRunner.dropTable("users")
      }

}
