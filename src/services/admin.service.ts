import { AppDataSource } from './../config/database.config';
import { Message } from './../constant/messages';
import { Auth } from './../entities/auth/auth.entity';
import { AuthDetails } from './../entities/auth/details.entity';
import HttpException from './../utils/HttpException.utils';

export class AdminService {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly authDetailsRepo = AppDataSource.getRepository(
            AuthDetails
        )
    ) {}

    async getById(id: string, details: boolean = true): Promise<Auth> {
        const query = this.authRepo
            .createQueryBuilder('admin')
            .where('admin.id = :id', { id });
        if (details) query.leftJoinAndSelect('admin.details', 'details');

        const user = await query.getOne();
        if (!user) throw HttpException.notFound(Message.notFound);

        return user;
    }
}
