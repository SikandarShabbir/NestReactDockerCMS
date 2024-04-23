import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./models/role.entity";
import {Repository, UpdateResult} from "typeorm";
import {AbstractService} from "../common/services/abstract.service";

@Injectable()
export class RoleService extends AbstractService {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
        super(roleRepository);
    }
}
