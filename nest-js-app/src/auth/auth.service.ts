import {Injectable, Req} from '@nestjs/common';
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {Permission} from "../permission/model/permission.entity";
import {User} from "../user/models/user.entity";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {
    }

    async userId(@Req() request: Request): Promise<number> {
        const verifiedJwtToken = await this.jwtService.verifyAsync(request.cookies.jwt);
        return verifiedJwtToken.id;
    }

    async userData(@Req() request: Request): Promise<User> {
        if (! request.cookies.jwt){
            return null;
        }
        const verifiedJwtToken = await this.jwtService.verifyAsync(request.cookies.jwt);

        return this.userService.findOneBy({id: verifiedJwtToken.id}, ['role']);
        // const permissions = Permission.findOne({
        //     where:
        // });
    }
}
