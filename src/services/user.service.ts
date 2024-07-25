import { AppDataSource } from './../config/database.config';
import { NewsLetter } from './../entities/newLetter.entity';
import HttpException from './../utils/HttpException.utils';

export class UserService {
    constructor(
        private readonly newsLetterRepo = AppDataSource.getRepository(
            NewsLetter
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

    async messageForm() {}
}

export default new UserService();
