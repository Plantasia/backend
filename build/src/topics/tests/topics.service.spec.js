"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const topics_service_1 = require("../topics.service");
describe('TopicsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [topics_service_1.TopicsService],
        }).compile();
        service = module.get(topics_service_1.TopicsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=topics.service.spec.js.map