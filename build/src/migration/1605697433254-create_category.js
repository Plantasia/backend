"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory1605697433254 = void 0;
const typeorm_1 = require("typeorm");
class createCategory1605697433254 {
    async up(queryRunner) {
        new typeorm_1.Table({ name: "categories",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                    isNullable: false,
                },
                {
                    name: "name",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "author",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "imageStorage",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "isActive",
                    type: "tinyint",
                    isNullable: false,
                    default: 1,
                }
            ]
        });
    }
    async down(queryRunner) {
        await queryRunner.dropTable('categories');
    }
}
exports.createCategory1605697433254 = createCategory1605697433254;
//# sourceMappingURL=1605697433254-create_category.js.map