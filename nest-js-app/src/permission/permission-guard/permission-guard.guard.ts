import {CanActivate, ExecutionContext, Injectable, Req} from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../user/models/user.entity";
import {RoleService} from "../../role/role.service";
import {Role} from "../../role/models/role.entity";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService, private roleService: RoleService) {
    }

    async canActivate(
        context: ExecutionContext,
    ) {
        const access = this.reflector.get('access', context.getHandler())
        // console.log(access);
        if (!access) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = await this.authService.userData(request);
        if (!user){
            return false;
        }
        const role: Role = await this.roleService.findOneBy({id: user.role.id}, ['permissions']);
        // console.log('Permissions', role.permissions);
        if (request.method == 'GET') {
            return role.permissions.some(obj => (obj.name === `view_${access}`) || (obj.name === `edit_${access}`));
        }
        return role.permissions.some(obj => obj.name === `edit_${access}`);
    }
}
