import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'Email should not be empty'})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'Password should not be empty'})
    // @MinLength(8)
    // @MaxLength(20)
    password: string;
}