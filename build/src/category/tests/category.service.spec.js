"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("../category.service");
describe('CategoryService', () => {
    let service;
    beforeEach(async () => {
        /* const module: TestingModule = await Test.createTestingModule({
          providers: [CategoryService],
        }).compile();
        service = module.get<CategoryService>(CategoryService); */
        service = new category_service_1.CategoryService();
    });
    it('it should returns categories', () => {
        expect(service.list()).toMatchObject([
            'Category A',
            'Category B',
            'Category C',
        ]);
    });
});
//# sourceMappingURL=category.service.spec.js.map