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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../category/category.entity");
const user_entity_1 = require("../user/user.entity");
let Topic = class Topic {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Topic.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Topic.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Topic.prototype, "textBody", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Topic.prototype, "imageStorage", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Topic.prototype, "reaction", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Topic.prototype, "isActive", void 0);
__decorate([
    typeorm_1.ManyToOne(() => category_entity_1.Category, category => category.topics),
    __metadata("design:type", category_entity_1.Category)
], Topic.prototype, "category", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Topic.prototype, "created_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Topic.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.default, user => user.topic),
    __metadata("design:type", user_entity_1.default)
], Topic.prototype, "user", void 0);
Topic = __decorate([
    typeorm_1.Entity()
], Topic);
exports.Topic = Topic;
//# sourceMappingURL=topic.entity.js.map