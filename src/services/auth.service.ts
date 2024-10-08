import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { Auth } from '../entities/auth/auth.entity';
import HttpException from '../utils/HttpException.utils';
import { DotenvConfig } from './../config/env.config';
import { createdMessage, Message } from './../constant/messages';
import { AuthDetails } from './../entities/auth/details.entity';
import { IUpdatePassword } from './../interface/auth.interface';
import adminService from './admin.service';
import { BcryptService } from './bcrypt.service';
import { EmailService, IMailOptions } from './utils/email.service';
import { WebTokenService } from './webToken.service';

class AuthService {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly authDetailsRepo = AppDataSource.getRepository(
            AuthDetails
        ),
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
            this.requestVerification(user?.email);
            return (
                createdMessage('User') +
                '\nVerify your email by clicking the link sent to your email address'
            );
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

    async forgotPassword(email: string) {
        const emailExist = await this.authRepo.findOne({
            where: { email: email },
        });
        if (!emailExist)
            throw HttpException.badRequest('Given Email does not exist');

        const token = this.webTokenGenerate.resetPasswordToken(
            emailExist.id as string
        );

        const verificationLink = `${DotenvConfig.BACKEND_URL}api/v1/auth/reset-password/${token}`;

        const mailOptions: IMailOptions = {
            to: emailExist?.email,
            subject: 'Regarding Password Reset',
            text:
                'Verification works withing 5 minutes with following link \n' +
                verificationLink,
        };
        this.emailService.sendMail(mailOptions);
    }

    async resetPassword(password: string, token: string) {
        const verified = await this.webTokenGenerate.verify(
            token,
            DotenvConfig.VERIFY_EMAIL_TOKEN_SECRET
        );
        if (!verified) throw HttpException.conflict('Invalid token');

        const user = await this.authRepo.findOneBy({ id: verified.id });
        if (user) user.password = await this.bcryptService.hash(password);
        else HttpException.badRequest('User id not found');
        user?.save();
        return 'Password reset successful';
    }

    async login(data: Auth) {
        let user = await this.authRepo.findOne({
            where: [{ email: data.email }],
            select: ['id', 'email', 'password', 'otpVerified'],
        });
        if (!user) throw HttpException.notFound(Message.invalidCredentials);
        if (!user?.otpVerified) {
            this.requestVerification(user?.email);
            throw HttpException.forbidden(
                'Please verify Email which has been sent to your email before signing in.'
            );
        }
        const isPasswordMatched = await this.bcryptService.compare(
            data.password,
            user.password
        );
        if (!isPasswordMatched)
            throw HttpException.notFound(Message.invalidCredentials);

        user = await adminService.getUserById(user?.id as string);
        const tokens = this.webTokenGenerate.generateTokens(
            user?.id as string,
            user.role
        );
        return { user, tokens };
    }

    async updatePassword(data: IUpdatePassword, id: string) {
        try {
            if (data.oldPassword === data.newPassword)
                throw HttpException.conflict(
                    'New password should differ from old password.'
                );

            let user = await this.authRepo.findOne({
                where: { id: id },
            });
            if (!user?.otpVerified)
                throw HttpException.badRequest('Please verify email first.');
            if (user) {
                if (
                    await this.bcryptService.compare(
                        data.oldPassword,
                        user.password
                    )
                ) {
                    try {
                        const password = await this.bcryptService.hash(
                            data.newPassword
                        );
                        user.password = password;
                        user.save();
                    } catch (error: any) {
                        throw HttpException.conflict(error?.message);
                    }
                } else throw HttpException.badRequest('Invalid Credential');
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService();
