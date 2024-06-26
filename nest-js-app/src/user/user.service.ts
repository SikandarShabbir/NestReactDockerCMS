import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {Repository, UpdateResult} from "typeorm";
import {AbstractService} from "../common/services/abstract.service";

@Injectable()
export class UserService extends AbstractService{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository);
    }
}
