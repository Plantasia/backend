"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const topics_controller_1 = require("../topics.controller");
describe('TopicsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [topics_controller_1.TopicsController],
        }).compile();
        controller = module.get(topics_controller_1.TopicsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=topics.controller.spec.js.map