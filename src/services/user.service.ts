import { AppDataSource } from './../config/database.config';
import { Message } from './../constant/messages';
import { ContactForm } from './../entities/contactForm.entity';
import { NewsLetter } from './../entities/newLetter.entity';
import { IContactForm } from './../interface/user.interface';
import HttpException from './../utils/HttpException.utils';

export class UserService {
    constructor(
        private readonly newsLetterRepo = AppDataSource.getRepository(
            NewsLetter
        ),
        private readonly contactFormRepo = AppDataSource.getRepository(
            ContactForm
        )
    ) {}

    async newsLetter(email: string) {
        try {
            let alreadyExist = await this.newsLetterRepo.findOne({
                where: [{ email: email }],
                select: ['id', 'email'],
            });

            if (alreadyExist)
                throw HttpException.badRequest(
                    'You have already subscribed to the news letter.'
                );
            const entry = this.newsLetterRepo.create();
            entry.email = email;
            await this.newsLetterRepo.save(entry);
        } catch (error) {
            throw error;
        }
    }

    async contactForm(data: IContactForm) {
        try {
            let form = this.contactFormRepo.create(data);
            await this.contactFormRepo.save(form);
        } catch (error) {
            throw HttpException.badRequest(Message.unsuccessfull);
        }
    }
}

export default new UserService();
