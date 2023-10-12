"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const common_module_1 = require("./common/common.module");
const product_module_1 = require("./product/product.module");
const order_module_1 = require("./order/order.module");
const core_1 = require("@nestjs/core");
const permission_guard_guard_1 = require("./permission/permission-guard/permission-guard.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'db',
                port: 3306,
                username: 'root',
                password: 'Nemo',
                database: 'nestjs_admin',
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            common_module_1.CommonModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule
        ],
        controllers: [],
        providers: [{
                provide: core_1.APP_GUARD,
                useClass: permission_guard_guard_1.PermissionGuard
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map