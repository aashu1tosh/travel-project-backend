import { AppDataSource } from './../config/database.config';
import { ROLE } from './../constant/enum';
import { Message } from './../constant/messages';
import { Auth } from './../entities/auth/auth.entity';
import { AuthDetails } from './../entities/auth/details.entity';
import HttpException from './../utils/HttpException.utils';

class AdminService {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly authDetailsRepo = AppDataSource.getRepository(
            AuthDetails
        )
    ) {}

    async getAllUser(page: number, perpage: number) {
        const query = this.authRepo
            .createQueryBuilder('auth')
            .select([
                'auth.id',
                'auth.createdAt',
                'auth.email',
                'auth.role',
                'auth.otpVerified',
            ]);
        query
            .orderBy('auth.createdAt')
            .limit(perpage)
            .offset((page - 1) * perpage);

        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }
    
    async getUserById(id: string, details: boolean = true): Promise<Auth> {
        const query = await this.authRepo
            .createQueryBuilder('auth')
            .leftJoinAndSelect('auth.details', 'details')
            .where('auth.id = :id', { id: id })
            .getOne();

        if (!query) throw HttpException.notFound(Message.notFound);

        return query;
    }

    async deleteUser(id: string) {
        const user = await this.getUserById(id);
        if (user?.role === ROLE.ADMIN)
            throw HttpException.forbidden('Admin cannot be deleted.');
        await this.authRepo
            .createQueryBuilder()
            .delete()
            .from(Auth)
            .where('id = :id', { id: id })
            .execute();
    }
}

export default new AdminService();
