import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { Auth } from '../entities/auth/auth.entity';
import HttpException from '../utils/HttpException.utils';
import { CreatedMessage, Message } from './../constant/messages';
import { AuthDetails } from './../entities/auth/details.entity';
import { AdminService } from './admin.service';
import { BcryptService } from './bcrypt.service';
import { WebTokenService } from './webToken.service';

class AuthService {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly authDetailsRepo = AppDataSource.getRepository(
            AuthDetails
        ),
        private readonly adminService = new AdminService(),
        private readonly bcryptService = new BcryptService(),
        private readonly webTokenGenerate = new WebTokenService()
    ) {}

    async createUser(data: Auth) {
        try {
            if (data?.role === ROLE.ADMIN)
                throw HttpException.badRequest(
                    Message.adminCreationNotAuthorized
                );

            const alreadyExist = await this.authRepo.findOne({
                where: { email: data.email },
            });

            const uniquePhoneNumber = await this.authDetailsRepo.findOne({
                where: {
                    phoneNumber: data.details.phoneNumber,
                },
            });

            if (alreadyExist)
                throw HttpException.badRequest(
                    `${data?.email} Email already used.`
                );

            if (uniquePhoneNumber)
                throw HttpException.badRequest(
                    `${data?.details?.phoneNumber} Phone number already used`
                );

            const user = this.authRepo.create(data);
            let details = this.authDetailsRepo.create(data.details);
            user.password = await this.bcryptService.hash(data.password);
            user.details = details;
            await this.authDetailsRepo.save(details);
            await this.authRepo.save(user);
            return CreatedMessage('User');
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async login(data: Auth) {
        let user = await this.authRepo.findOne({
            where: [{ email: data.email }],
            select: ['id', 'email', 'password'],
        });
        if (!user) throw HttpException.notFound(Message.invalidCredentials);
        const isPasswordMatched = await this.bcryptService.compare(
            data.password,
            user.password
        );
        if (!isPasswordMatched)
            throw HttpException.notFound(Message.invalidCredentials);

        user = await this.adminService.getById(user?.id as string);
        const tokens = this.webTokenGenerate.generateTokens(
            user?.id as string,
            user.role
        );
        return { user, tokens };
    }
}

export default new AuthService();
