import { UserService } from "../user/user.service";
import { RegisterDto } from "./models/register.dto";
import { LoginDto } from "./models/login.dto";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private userService;
    private jwtService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, authService: AuthService);
    register(body: RegisterDto): Promise<any[]>;
    login(login: LoginDto, response: Response): Promise<any>;
    user(request: Request): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
