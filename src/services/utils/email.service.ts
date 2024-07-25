import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { DotenvConfig } from '../../config/env.config';
import HttpException from '../../utils/HttpException.utils';

export interface IMailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export class EmailService {
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    private readonly from: string;

    constructor() {
        this.from = DotenvConfig.EMAIL_USER!;
        this.transporter = nodemailer.createTransport({
            host: DotenvConfig.MAIL_HOST,
            port: DotenvConfig.MAIL_PORT,
            secure: false,
            // requireTLS: true,
            auth: {
                user: DotenvConfig.EMAIL_USER,
                pass: DotenvConfig.EMAIL_PASSWORD,
            },
        });
    }

    async sendMail({ to, html, subject, text }: IMailOptions) {
        try {
            const mailOptions = {
                from: this.from,
                text,
                to,
                html,
                subject,
            };
            const res = await this.transporter.sendMail(mailOptions);
            return res;
        } catch (error) {
            throw HttpException.internalServerError('Error from email service');
        }
    }
}
