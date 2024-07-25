import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Message } from './../constant/messages';
import { phoneNumberRegex } from './../constant/regex';

export class EmailOnlyDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ContactFormDTO {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(phoneNumberRegex, {
        message: Message.validPhoneNumber,
    })
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}
