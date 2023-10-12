import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {RoleService} from "./role.service";
import {Role} from "./models/role.entity";
import {RoleDto} from "./models/role.dto";
import {UpdateRoleDto} from "./models/updateRole.dto";
import {HasPermission} from "../permission/Decorator/has-permission.decorator";
import {AuthGuard} from "../auth/auth.guard";

UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    // @Get()
    // @HasPermission('roles')
    // async all(): Promise<Role[]> {
    //     return await this.roleService.all();
    // }

    @Get(':id')
    @HasPermission('roles')
    async get(@Param('id') id: number): Promise<Role> {
        return await this.roleService.findOneBy({id});
    }

    @Post()
    @HasPermission('roles')
    async create(@Body() roleDTO: RoleDto): Promise<Role[]> {
        if (await this.roleService.findOneBy({name: roleDTO.name})) {
            throw new BadRequestException(['Role already exists, please try another!']);
        }
        return await this.roleService.create({
            name: roleDTO.name,
            permissions: roleDTO.permissions.map(id => ({id}))
        });
    }

    @Put(':id')
    @HasPermission('roles')
    async update(@Body() roleDTO: UpdateRoleDto, @Param('id') id: number) {
        await this.roleService.update(id, {
            name: roleDTO.name
        });
        const role = await this.roleService.findOneBy({id});
        return await this.roleService.create({
            ...role,
            permissions: roleDTO.permissions.map(id => ({id}))
        });
    }

    @Delete(':id')
    @HasPermission('roles')
    async delete(@Param('id') id: number) {
        return await this.roleService.delete(id);
    }

    @Get()
    @HasPermission('roles')
    async paginate(@Query('page') page: number, @Query('take') take: number): Promise<any> {
        return await this.roleService.paginate(page, take, ['permissions']);
    }
}
