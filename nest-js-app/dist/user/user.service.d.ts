import { User } from "./models/user.entity";
import { Repository } from "typeorm";
import { AbstractService } from "../common/services/abstract.service";
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
