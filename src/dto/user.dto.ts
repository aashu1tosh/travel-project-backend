import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailOnlyDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}