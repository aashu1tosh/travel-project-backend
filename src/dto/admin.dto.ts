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

export class ContactInformationDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    location: string;

    @IsOptional()
    @IsNumber()
    lat: number;

    @IsOptional()
    @IsNumber()
    long: number;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    availableDays: string;

    @IsOptional()
    @IsString()
    availableTime: string;

    @IsOptional()
    @Matches(phoneNumberRegex, {
        message: Message.validPhoneNumber,
    })
    phoneNumber: string;

    @IsOptional()
    @IsString()
    secondaryPhoneNumber: string;

    @IsOptional()
    @IsString()
    facebookLink: string;

    @IsOptional()
    @IsString()
    instagramLink: string;

    @IsOptional()
    @IsString()
    twitterLink: string;
}
