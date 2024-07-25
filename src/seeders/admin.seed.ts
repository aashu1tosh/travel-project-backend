import { AppDataSource } from '../config/database.config';
import { Auth } from '../entities/auth/auth.entity';
import { AuthDetails } from './../entities/auth/details.entity';
import { IUser } from './../interface/user.interface';
import { BcryptService } from './../services/bcrypt.service';

import { admins } from './../constant/admin';
import Print from './../utils/print';
const authRepo = AppDataSource.getRepository(Auth);
const authDetailsRepo = AppDataSource.getRepository(AuthDetails);
const bcryptService = new BcryptService();

async function seedAdmin(data: Auth) {
    try {
        const alreadyExist = await authRepo.findOne({
            where: { email: data.email },
        });

        const uniquePhoneNumber = await authDetailsRepo.findOne({
            where: {
                phoneNumber: data.details.phoneNumber,
            },
        });

        if (alreadyExist) throw new Error(`${data?.email} Email already used.`);

        if (uniquePhoneNumber)
            throw new Error(
                `${data?.details?.phoneNumber} Phone number already used`
            );

        const user = authRepo.create(data);
        user.otpVerified = true;
        let details = authDetailsRepo.create(data.details);
        user.password = await bcryptService.hash(data.password);
        user.details = details;
        await authDetailsRepo.save(details);
        await authRepo.save(user);
        Print.info('Admin seeded successfully');
    } catch (error: any) {
        Print.error(error?.message);
    }
}

async function seedAdmins(admins: IUser[]): Promise<void> {
    try {
        await AppDataSource.initialize();
        for (const admin of admins) {
            await seedAdmin(admin as Auth);
        }
    } catch (error) {
        console.log('Failed to seed admin 💣');
        console.error(error);
    } finally {
        process.exit(0);
    }
}

const args = process.argv[2];
if (!args) {
    console.error('Please provide an argument');
    process.exit(1);
}

if (args === 'seed') {
    void seedAdmins(admins);
} else {
    console.error('Invalid argument');
    process.exit(1);
}
