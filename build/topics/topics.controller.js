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
exports.TopicsController = void 0;
const common_1 = require("@nestjs/common");
const topics_service_1 = require("./topics.service");
const create_topic_dto_1 = require("./create-topic.dto");
let TopicsController = class TopicsController {
    constructor(topicsService) {
        this.topicsService = topicsService;
    }
    findAll() {
        return this.topicsService.findAll();
    }
    update(id, createTopicDTO) {
        return this.topicsService.update(id, createTopicDTO);
    }
    create(category_id, createTopicDTO) {
        /** This assures us integrity references into DB */
        createTopicDTO.category_id = category_id;
        return this.topicsService.create(createTopicDTO);
    }
    findOne(id) {
        return this.topicsService.findOne(id);
    }
    delete(id) {
        this.topicsService.findOne(id);
        return;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "findAll", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_topic_dto_1.CreateTopicDTO]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "update", null);
__decorate([
    common_1.Post(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_topic_dto_1.CreateTopicDTO]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "findOne", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "delete", null);
TopicsController = __decorate([
    common_1.Controller('topics'),
    __metadata("design:paramtypes", [topics_service_1.TopicsService])
], TopicsController);
exports.TopicsController = TopicsController;
//# sourceMappingURL=topics.controller.js.map