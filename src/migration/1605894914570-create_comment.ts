import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createComment1605894914570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({ name:"comments",
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
                 name:"bodyText",
                 type:"text",
                 isNullable:false,
             },
             {
                 name:"reaction",
                 type:"text",
                 isNullable:false,
             },
             {
                 name:"disabe",
                 type:"boolean",
                 isNullable:true
             },
             {
                name:"hasParentComment",
                type:"booleran",
                isNullable:false
            },
            {
                name:"idParentComment",
                type:"text",
                isNullable:false
            },
            {
                name:"indexOrder",
                type: 'int',
                isNullable:true,
                isGenerated: true,
                generationStrategy: 'increment'
            }
         ]
     })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
