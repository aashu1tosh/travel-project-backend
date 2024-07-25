import { ROLE } from './../constant/enum';

export interface IUser {
    email: string;
    password: string;
    role: ROLE;
    details: {
        firstName: string;
        middleName?: string | null;
        lastName: string;
        phoneNumber: string;
    };
}

export interface IContactForm {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
}
