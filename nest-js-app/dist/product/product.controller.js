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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const auth_guard_1 = require("../auth/auth.guard");
const createProduct_dto_1 = require("./models/createProduct.dto");
const updateProduct_dto_1 = require("./models/updateProduct.dto");
const has_permission_decorator_1 = require("../permission/Decorator/has-permission.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async get(id) {
        return await this.productService.findOneBy({ id });
    }
    async create(productDTO) {
        return await this.productService.create(productDTO);
    }
    async update(productDTO, id) {
        await this.productService.update(id, productDTO);
        return await this.productService.findOneBy({ id });
    }
    async delete(id) {
        return await this.productService.delete(id);
    }
    async paginate(page, take) {
        return await this.productService.paginate(page, take);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, has_permission_decorator_1.HasPermission)('products'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, has_permission_decorator_1.HasPermission)('products'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProduct_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, has_permission_decorator_1.HasPermission)('products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateProduct_dto_1.UpdateProductDto, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, has_permission_decorator_1.HasPermission)('products'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, has_permission_decorator_1.HasPermission)('products'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "paginate", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map