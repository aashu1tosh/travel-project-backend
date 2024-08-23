import { AppDataSource } from './../config/database.config';
import { Company } from './../entities/company.entity';
import { ICompany } from './../interface/company.interface';
import HttpException from './../utils/HttpException.utils';
import mediaService from './media.service';

class CompanyService {
    constructor(
        private readonly companyRepo = AppDataSource.getRepository(Company)
    ) {}

    async getCompany() {
        const lastEntry = await this.companyRepo
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.media', 'media')
            .orderBy('company.updatedAt', 'DESC')
            .limit(1)
            .getOne();

        return lastEntry;
    }
    async addCompany(data: Company) {
        const lastEntry = await this.companyRepo
            .createQueryBuilder('company')
            .orderBy('company.updatedAt', 'DESC')
            .limit(1)
            .getOne();

        if (lastEntry) {
            const { id, createdAt, ...payload } = data;
            const updatedRecord = Object.assign(lastEntry, payload);
            await this.companyRepo.save(updatedRecord);
            if (lastEntry?.media != payload?.media)
                mediaService.deleteMedia(lastEntry?.media as unknown as string);
            return this.getCompany();
        }

        const query = this.companyRepo.create(data as unknown as Company);
        await this.companyRepo.save(query);
        return this.getCompany();
    }

    async updateCompany(id: string, data: ICompany) {
        const query = await this.companyRepo.findOneBy({ id });
        if (!query)
            throw HttpException.badRequest(
                'Please add company information first.'
            );
        const updatedRecord = Object.assign(query, data);
        this.companyRepo.save(updatedRecord);
        return this.getCompany();
    }
}

export default new CompanyService();
