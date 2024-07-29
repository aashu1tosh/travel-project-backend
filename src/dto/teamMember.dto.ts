import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from "class-validator";
import { Message } from "./../constant/messages";
import { phoneNumberRegex } from "./../constant/regex";

export class AddTeamMemberDTO {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsNotEmpty()
    // @Matches(phoneNumberRegex, {
    //     message: Message.validPhoneNumber,
    // })
    // phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNotEmpty()
    @IsUUID()
    media: string;
}