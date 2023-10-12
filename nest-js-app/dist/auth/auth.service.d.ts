import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/models/user.entity";
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    userId(request: Request): Promise<number>;
    userData(request: Request): Promise<User>;
}
