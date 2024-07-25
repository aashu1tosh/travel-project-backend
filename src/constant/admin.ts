import { DotenvConfig } from './../config/env.config';
import { IUser } from './../interface/user.interface';
import { ROLE } from './enum';



export const admins: IUser[] = [
    {
        email: 'admin@infocare.com',
        password: DotenvConfig.ADMIN_PASSWORD,
        role: ROLE.ADMIN,
        details: {
            firstName: 'Information',
            middleName: 'Care',
            lastName: 'Pvt. Ltd.',
            phoneNumber: '9843818516'
        }
    },
]
