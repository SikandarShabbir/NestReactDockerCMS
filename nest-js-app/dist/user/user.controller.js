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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_dto_1 = require("./models/user.dto");
const bcrypt = require("bcrypt");
const updateUser_dto_1 = require("./models/updateUser.dto");
const auth_service_1 = require("../auth/auth.service");
const has_permission_decorator_1 = require("../permission/Decorator/has-permission.decorator");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async get(id) {
        return await this.userService.findOneBy({ id }, ['role']);
    }
    async create(userDTO) {
        if (await this.userService.findOneBy({ email: userDTO.email })) {
            throw new common_1.BadRequestException(['Email already exists, please try another!']);
        }
        const password = await bcrypt.hash(userDTO.password, 10);
        const { role_id, ...data } = userDTO;
        return await this.userService.create({
            ...data,
            role: { id: role_id },
            password
        });
    }
    async updateIn(userDTO, request) {
        const { role_id, ...data } = userDTO;
        const userId = await this.authService.userId(request);
        await this.userService.update(userId, data);
        return await this.userService.findOneBy({ id: userId });
    }
    async updatePassword(password, password_confirm, request) {
        if (password != password_confirm) {
            throw new common_1.BadRequestException(['Password should be same!']);
        }
        const userId = await this.authService.userId(request);
        const hash = await bcrypt.hash(password, 10);
        return this.userService.update(userId, {
            password: hash
        });
    }
    async update(userDTO, id) {
        if (userDTO.email && await this.userService.findOneBy({ email: userDTO.email })) {
            throw new common_1.BadRequestException(['Email already exists, please try another!']);
        }
        const { role_id, ...data } = userDTO;
        await this.userService.update(id, {
            ...data,
            role: { id: role_id }
        });
        return await this.userService.findOneBy({ id });
    }
    async delete(id) {
        return await this.userService.delete(id);
    }
    async paginate(page, take) {
        return await this.userService.paginate(page, take, ['role']);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, has_permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, has_permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('info'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateIn", null);
__decorate([
    (0, common_1.Put)('password'),
    __param(0, (0, common_1.Body)('password')),
    __param(1, (0, common_1.Body)('password_confirm')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, has_permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.UpdateUserDto, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, has_permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, has_permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "paginate", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map