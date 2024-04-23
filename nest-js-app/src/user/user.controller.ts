import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Param,
    Post, Put, Query, Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./models/user.entity";
import {AuthGuard} from "../auth/auth.guard";
import {UserDto} from "./models/user.dto";
import * as bcrypt from "bcrypt";
import {UpdateUserDto} from "./models/updateUser.dto";
import {AuthService} from "../auth/auth.service";
import {Request} from "express";
import {UpdateResult} from "typeorm";
import {HasPermission} from "../permission/Decorator/has-permission.decorator";

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private userService: UserService,
                private authService: AuthService
    ) {
    }

    // @Get()
    // async all(): Promise<User[]> {
    //     return await this.userService.all();
    // }

    @Get(':id')
    @HasPermission('users')
    async get(@Param('id') id: number): Promise<User> {
        return await this.userService.findOneBy({id}, ['role']);
    }

    @Post()
    @HasPermission('users')
    async create(@Body() userDTO: UserDto): Promise<User[]> {
        if (await this.userService.findOneBy({email: userDTO.email})) {
            throw new BadRequestException(['Email already exists, please try another!']);
        }
        const password = await bcrypt.hash(userDTO.password, 10);
        const {role_id, ...data} = userDTO;
        return await this.userService.create({
            ...data,
            role: {id: role_id},
            password
        });
    }

    @Put('info')
    async updateIn(@Body() userDTO: UpdateUserDto, @Req() request: Request): Promise<any | null> {
        const {role_id, ...data} = userDTO;
        const userId = await this.authService.userId(request);
        await this.userService.update(userId, data);
        // await this.userService.update(id, userDTO);
        return await this.userService.findOneBy({id: userId});
    }

    @Put('password')
    async updatePassword(
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
        @Req() request: Request
        ): Promise<UpdateResult> {
        if (password != password_confirm) {
            throw new BadRequestException(['Password should be same!']);
        }
        const userId = await this.authService.userId(request);
        const hash = await bcrypt.hash(password, 10);
        return this.userService.update(userId,{
            password: hash
        });
    }

    @Put(':id')
    @HasPermission('users')
    async update(@Body() userDTO: UpdateUserDto, @Param('id') id: number) {
        if (userDTO.email && await this.userService.findOneBy({email: userDTO.email})) {
            throw new BadRequestException(['Email already exists, please try another!']);
        }
        const {role_id, ...data} = userDTO;
        await this.userService.update(id, {
            ...data,
            role: {id: role_id}
        });
        // await this.userService.update(id, userDTO);
        return await this.userService.findOneBy({id});
    }

    @Delete(':id')
    @HasPermission('users')
    async delete(@Param('id') id: number) {
        return await this.userService.delete(id);
    }

    @Get()
    @HasPermission('users')
    async paginate(@Query('page') page: number, @Query('take') take: number): Promise<any> {
        return await this.userService.paginate(page, take, ['role']);
    }
}
