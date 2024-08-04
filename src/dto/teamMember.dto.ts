import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';
import { Message } from './../constant/messages';
import { phoneNumberRegex } from './../constant/regex';

export class AddTeamMemberDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @Matches(phoneNumberRegex, {
        message: Message.validPhoneNumber,
    })
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNotEmpty({
        message: 'Media is required',
    })
    @IsString({
        message: 'Media is required',
    })
    media: string;
}
