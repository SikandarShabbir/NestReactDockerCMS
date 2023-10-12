import {IsEmail, IsNotEmpty} from "class-validator";
import {Exclude} from "class-transformer";

export class UpdateUserDto {
    first_name?: string;
    last_name?: string;
    email?: string;
    role_id?: number;
}