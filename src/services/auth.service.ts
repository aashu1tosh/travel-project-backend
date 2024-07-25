import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { Auth } from '../entities/auth/auth.entity';
import HttpException from '../utils/HttpException.utils';
import { DotenvConfig } from './../config/env.config';
import { CreatedMessage, Message } from './../constant/messages';
import { AuthDetails } from './../entities/auth/details.entity';
import { AdminService } from './admin.service';
import { BcryptService } from './bcrypt.service';
import { EmailService, IMailOptions } from './utils/email.service';
import { WebTokenService } from './webToken.service';

class AuthService {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly authDetailsRepo = AppDataSource.getRepository(
            AuthDetails
        ),
        private readonly adminService = new AdminService(),
        private readonly bcryptService = new BcryptService(),
        private readonly webTokenGenerate = new WebTokenService(),
        private readonly emailService = new EmailService()
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

    async requestVerification(email: string) {
        try {
            const emailExist = await this.authRepo.findOne({
                where: { email: email },
            });
            if (!emailExist)
                throw HttpException.badRequest('Given Email does not exist');

            const token = this.webTokenGenerate.emailVerifyToken(
                emailExist.id as string
            );

            const verificationLink = `${DotenvConfig.BACKEND_URL}api/v1/auth/verify/${token}`;

            const mailOptions: IMailOptions = {
                to: emailExist?.email,
                subject: 'Regarding Email Verification',
                text:
                    'Verification works withing 5 minutes with following link \n' +
                    verificationLink,
            };
            this.emailService.sendMail(mailOptions);
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail(token: string) {
        try {
            console.log(token);
            const verified = await this.webTokenGenerate.verify(
                token,
                DotenvConfig.VERIFY_EMAIL_TOKEN_SECRET
            );
            if (!verified) throw HttpException.conflict(Message.invalidOTP);

            const user = await this.authRepo.findOneBy({ id: verified.id });
            if (user) user.otpVerified = true;
            user?.save();

            return 'Email Verification Successful';
        } catch (error) {
            throw error;
        }
    }

    async login(data: Auth) {
        let user = await this.authRepo.findOne({
            where: [{ email: data.email }],
            select: ['id', 'email', 'password', 'otpVerified'],
        });
        if (!user) throw HttpException.notFound(Message.invalidCredentials);
        if (!user?.otpVerified)
            throw HttpException.forbidden(
                'Please verify Email before signing in.'
            );
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
