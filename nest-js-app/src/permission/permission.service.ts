import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./model/permission.entity";
import {Repository} from "typeorm";
import {AbstractService} from "../common/services/abstract.service";

@Injectable()
export class PermissionService extends AbstractService {
    constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>) {
        super(permissionRepository);
    }
}
