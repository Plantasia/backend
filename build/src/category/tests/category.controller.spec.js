"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const category_controller_1 = require("..//category.controller");
const category_service_1 = require("../category.service");
describe('AppController', () => {
    let appController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [category_controller_1.CategoryController],
            providers: [category_service_1.CategoryService],
        }).compile();
        appController = app.get(category_controller_1.CategoryController);
    });
});
;
//# sourceMappingURL=category.controller.spec.js.map