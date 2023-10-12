import { Permission } from "./model/permission.entity";
import { Repository } from "typeorm";
import { AbstractService } from "../common/services/abstract.service";
export declare class PermissionService extends AbstractService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
}
