import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    Max,
    Min,
} from 'class-validator';
import { Message } from './../constant/messages';
import { phoneNumberRegex } from './../constant/regex';

export class ContactInformationDTO {
    @IsNotEmpty()
    @IsUUID()
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

export class TestimonialDTO {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    testimonial: string;

    @IsNotEmpty()
    @IsString()
    reviewerLocation: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: string;

    @IsOptional()
    @IsUUID()
    media: string;
}
