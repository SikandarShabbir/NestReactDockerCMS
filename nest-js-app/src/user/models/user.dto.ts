import {IsEmail, IsNotEmpty} from "class-validator";
import {Exclude} from "class-transformer";

export class UserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role_id: number;
}