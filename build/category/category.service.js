"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(
    //@Inject('CATEGORIES_REPOSITORY')
    categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findAll() {
        return this.categoryRepository.find();
    }
    async findOne(id) {
        return this.categoryRepository.findOne({
            where: {
                id,
            },
        });
    }
    async remove(id) {
        console.log('deleted!!');
        await this.categoryRepository.delete(id);
    }
    async create(createCategoryDTO) {
        const category = new category_entity_1.Category();
        category.name = createCategoryDTO.name;
        category.author = createCategoryDTO.author;
        category.description = createCategoryDTO.description;
        category.imageStorage = createCategoryDTO.imageStorage;
        const cat = await this.categoryRepository.create(category);
        return this.categoryRepository.save(cat);
    }
    async update(id, data) {
        await this.categoryRepository.update(id, data);
        return this.categoryRepository.findOne(id);
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map