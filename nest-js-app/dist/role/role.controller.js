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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_dto_1 = require("./models/role.dto");
const updateRole_dto_1 = require("./models/updateRole.dto");
const has_permission_decorator_1 = require("../permission/Decorator/has-permission.decorator");
const auth_guard_1 = require("../auth/auth.guard");
(0, common_1.UseGuards)(auth_guard_1.AuthGuard);
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async get(id) {
        return await this.roleService.findOneBy({ id });
    }
    async create(roleDTO) {
        if (await this.roleService.findOneBy({ name: roleDTO.name })) {
            throw new common_1.BadRequestException(['Role already exists, please try another!']);
        }
        return await this.roleService.create({
            name: roleDTO.name,
            permissions: roleDTO.permissions.map(id => ({ id }))
        });
    }
    async update(roleDTO, id) {
        await this.roleService.update(id, {
            name: roleDTO.name
        });
        const role = await this.roleService.findOneBy({ id });
        return await this.roleService.create({
            ...role,
            permissions: roleDTO.permissions.map(id => ({ id }))
        });
    }
    async delete(id) {
        return await this.roleService.delete(id);
    }
    async paginate(page, take) {
        return await this.roleService.paginate(page, take, ['permissions']);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, has_permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, has_permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, has_permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateRole_dto_1.UpdateRoleDto, Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, has_permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, has_permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "paginate", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map