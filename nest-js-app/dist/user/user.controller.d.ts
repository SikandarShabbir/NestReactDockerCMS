import { UserService } from "./user.service";
import { User } from "./models/user.entity";
import { UserDto } from "./models/user.dto";
import { UpdateUserDto } from "./models/updateUser.dto";
import { AuthService } from "../auth/auth.service";
import { Request } from "express";
import { UpdateResult } from "typeorm";
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    get(id: number): Promise<User>;
    create(userDTO: UserDto): Promise<User[]>;
    updateIn(userDTO: UpdateUserDto, request: Request): Promise<any | null>;
    updatePassword(password: string, password_confirm: string, request: Request): Promise<UpdateResult>;
    update(userDTO: UpdateUserDto, id: number): Promise<any>;
    delete(id: number): Promise<any>;
    paginate(page: number, take: number): Promise<any>;
}
