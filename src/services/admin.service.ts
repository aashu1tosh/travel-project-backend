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

    async getAllUser() {
        const query = await this.authRepo.createQueryBuilder('admin').getMany();

        return query;
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
