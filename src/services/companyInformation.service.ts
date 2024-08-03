import { AppDataSource } from './../config/database.config';
import { ContactInformation } from './../entities/contactInformation.entity';

class CompanyContactInformation {
    constructor(
        private readonly companyRepo = AppDataSource.getRepository(
            ContactInformation
        )
    ) {}

    async getCompany() {
        const lastEntry = await this.companyRepo
            .createQueryBuilder('company')
            .orderBy('company.createdAt', 'DESC')
            .limit(1)
            .getOne();
        return lastEntry;
    }
}

export default new CompanyContactInformation();
