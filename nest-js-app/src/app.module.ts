import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import {RoleModule} from './role/role.module';
import {PermissionModule} from './permission/permission.module';
import {CommonModule} from './common/common.module';
import {ProductModule} from "./product/product.module";
import {OrderModule} from './order/order.module';
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "./permission/permission-guard/permission-guard.guard";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'db',
            port: 3306,
            username: 'root',
            password: 'Nemo',
            database: 'nestjs_admin',
            // entities: [],
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
        RoleModule,
        PermissionModule,
        CommonModule,
        ProductModule,
        OrderModule
    ],
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: PermissionGuard
    }],
})
export class AppModule {
}
