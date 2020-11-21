import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1605879828481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({ name:"user",
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
                 name:"userDescription",
                 type:"text",
                 isNullable:false,
             },
             {
                 name:"role",
                 type:"text",
                 isNullable:true
             },
             {
                name:"avatr",
                type:"texte",
                isNullable:false
            },
            {
                name:"email",
                type:"text",
                isNullable:false
            },
            {
                name:"password",
                type:"text",
                isNullable:false
            },
            {
                name:"isActive",
                type:"boolean",
                isNullable:false
            },
            {
                name:"quarentineNum",
                type:"int",
                isNullable:false
            }
         ]
     })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
