import { AppDataSource } from './../config/database.config';
import { Company } from './../entities/company.entity';
import { ICompany } from './../interface/company.interface';
import HttpException from './../utils/HttpException.utils';

class CompanyService {
    constructor(
        private readonly companyRepo = AppDataSource.getRepository(Company)
    ) {}

    async getCompany() {
        const lastEntry = await this.companyRepo
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.media', 'media')
            .orderBy('company.createdAt', 'DESC')
            .limit(1)
            .getOne();
        console.log('🚀 ~ CompanyService ~ getCompany ~ lastEntry:', lastEntry);
        return lastEntry;
    }
    async addCompany(data: ICompany) {
        const query = this.companyRepo.create(data as unknown as Company);
        await this.companyRepo.save(query);
        return;
    }

    async updateCompany(id: string, data: ICompany) {
        const query = await this.companyRepo.findOneBy({ id });
        if (!query)
            throw HttpException.badRequest(
                'Please add company information first.'
            );
        const updatedRecord = Object.assign(query, data);
        this.companyRepo.save(updatedRecord);
        return;
    }
}

export default new CompanyService();
