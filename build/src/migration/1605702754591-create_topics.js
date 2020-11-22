"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopics1605702754591 = void 0;
const typeorm_1 = require("typeorm");
class createTopics1605702754591 {
    async up(queryRunner) {
        new typeorm_1.Table({ name: "topics",
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
                    name: "topicBody",
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
                },
            ]
        });
    }
    async down(queryRunner) {
        await queryRunner.dropTable('topics');
    }
}
exports.createTopics1605702754591 = createTopics1605702754591;
//# sourceMappingURL=1605702754591-create_topics.js.map