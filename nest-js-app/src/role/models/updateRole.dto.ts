import {IsNotEmpty} from "class-validator";

export class UpdateRoleDto {
    name?: string;
    permissions?: number[];
}