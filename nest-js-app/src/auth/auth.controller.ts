import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {RegisterDto} from "./models/register.dto";
import {LoginDto} from "./models/login.dto";
import {JwtService} from "@nestjs/jwt";
import {Request, Response} from "express";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private userService: UserService,
                private jwtService: JwtService,
                private authService: AuthService,
    ) {
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password != body.password_confirm) {
            throw new BadRequestException(['Password should be same!']);
        } else if (await this.userService.findOneBy({email: body.email})) {
            throw new BadRequestException(['Email already exists, please try another!']);
        }
        const hash = await bcrypt.hash(body.password, 10);
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hash,
        });
    }

    @Post('login')
    async login(@Body() login: LoginDto, @Res({passthrough: true}) response: Response) {
        const user = await this.userService.findOneBy({email: login.email});
        if (!user) {
            // throw new BadRequestException(['Email not found!']);
            throw new UnauthorizedException();
        } else if (!await bcrypt.compare(login.password, user.password)) {
            throw new BadRequestException(['Invalid Password!']);
        }

        const payload = {id: user.id, email: user.email};
        const jwt = await this.jwtService.signAsync(payload);
        response.cookie('jwt', jwt, {httpOnly: true});
        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const userId = await this.authService.userId(request);
        return this.userService.findOneBy({id: userId});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'success'
        }
    }
}
