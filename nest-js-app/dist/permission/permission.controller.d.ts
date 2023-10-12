import { PermissionService } from "./permission.service";
export declare class PermissionController {
    private permissionService;
    constructor(permissionService: PermissionService);
    get(): Promise<any[]>;
}
