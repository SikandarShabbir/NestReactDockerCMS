import { RoleService } from "./role.service";
import { Role } from "./models/role.entity";
import { RoleDto } from "./models/role.dto";
import { UpdateRoleDto } from "./models/updateRole.dto";
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    get(id: number): Promise<Role>;
    create(roleDTO: RoleDto): Promise<Role[]>;
    update(roleDTO: UpdateRoleDto, id: number): Promise<any[]>;
    delete(id: number): Promise<any>;
    paginate(page: number, take: number): Promise<any>;
}
