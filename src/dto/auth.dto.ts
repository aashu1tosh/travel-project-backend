import { Type as CType } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    ValidateNested,
} from 'class-validator';
import { ROLE } from '../constant/enum';
import { passwordRegex, phoneNumberRegex } from '../constant/regex';
import { Message } from './../constant/messages';

export class DetailsDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    middleName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @Matches(phoneNumberRegex, {
        message: Message.validPhoneNumber,
    })
    phoneNumber: string;
}

export class CreateUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ValidateNested()
    @IsDefined()
    @CType(() => DetailsDTO)
    details: DetailsDTO;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message: Message.passwordShouldBeStrong,
    })
    password: string;

    @IsNotEmpty()
    @IsEnum(ROLE)
    role: string;
}

export class RequestEmailVerificationDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message: Message.passwordShouldBeStrong,
    })
    password: string;
}

export class EmailDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ResetPasswordDTO {
    @IsNotEmpty()
    @Matches(passwordRegex, {
        message: Message.passwordShouldBeStrong,
    })
    password: string;
}

export class GoogleLoginDTO {
    @IsNotEmpty()
    @IsString()
    googleId: string;
}

export class UpdatePasswordDTO {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message: Message.passwordShouldBeStrong,
    })
    newPassword: string;
}
