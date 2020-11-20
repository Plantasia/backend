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
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const topic_entity_1 = require("./topic.entity");
const category_service_1 = require("../category/category.service");
let TopicsService = class TopicsService {
    constructor(topicRepository, categoryService) {
        this.topicRepository = topicRepository;
        this.categoryService = categoryService;
    }
    async create(createTopicDTO) {
        const topic = new topic_entity_1.Topic;
        topic.name = createTopicDTO.name;
        topic.textBody = createTopicDTO.textBody;
        topic.imageStorage = createTopicDTO.imageStorage;
        const category_id = createTopicDTO.category_id;
        topic.category = await this.categoryService.findOne(category_id);
        /** this creates an entity instance */
        const t = await this.topicRepository.create(topic);
        /**now, we're  saving into DB */
        this.topicRepository.save(t);
        return this.topicRepository.findOne({
            where: {}
        });
    }
    async findAll() {
        return this.topicRepository.find();
    }
    async findOne(id) {
        return this.topicRepository.findOne({
            where: {
                id: id
            },
        });
    }
    async update(id, data) {
        await this.topicRepository.update(id, data);
        return await this.topicRepository.findOne(id);
    }
    async delete(id) {
        await this.topicRepository.delete(id);
    }
};
TopicsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_service_1.CategoryService])
], TopicsService);
exports.TopicsService = TopicsService;
//# sourceMappingURL=topics.service.js.map