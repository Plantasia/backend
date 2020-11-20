import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTopics1605702754591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({ name:"topics",
         columns:[
             {
                 name:"id",
                 type:"varchar",
                 isPrimary: true,
                 generationStrategy:'uuid',
                 default:'uuid_generate_v4()',
                 isNullable:false,
             },

             {
                 name:"name",
                 type:"text",
                 isNullable:false,
             },
             {
                 name:"topicBody",
                 type:"text",
                 isNullable:false,
             },
             {
                 name:"imageStorage",
                 type:"text",
                 isNullable:true
             }
             ,
             {
                 name: "isActive",
                 type: "tinyint",
                 isNullable: false,
                 default:1,
             },
         ]
     })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('topics');
    }

}
