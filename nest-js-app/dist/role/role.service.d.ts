import { Role } from "./models/role.entity";
import { Repository } from "typeorm";
import { AbstractService } from "../common/services/abstract.service";
export declare class RoleService extends AbstractService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
}
