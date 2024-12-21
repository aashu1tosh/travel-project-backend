import { DotenvConfig } from './../config/env.config';
import { IUser } from './../interface/user.interface';
import { ROLE } from './enum';

export const admins: IUser[] = [
    {
        email: 'admin@aashutosh.com',
        password: DotenvConfig.ADMIN_PASSWORD,
        role: ROLE.ADMIN,
        details: {
            firstName: 'Aashutosh',
            middleName: '',
            lastName: 'Parajuli',
            phoneNumber: '9843818516',
        },
    },
];
