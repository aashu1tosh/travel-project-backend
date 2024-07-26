import { AppDataSource } from './../config/database.config';
import { ContactInformation } from './../entities/contactInformation.entity';
import { IContactInformation } from './../interface/contactInformation.interface';
import HttpException from './../utils/HttpException.utils';

class ContactInformationService {
    constructor(
        private readonly contactInfoRepo = AppDataSource.getRepository(
            ContactInformation
        )
    ) {}

    async updateContactInformation(id: string, data: IContactInformation) {
        const query = await this.contactInfoRepo.findOneBy({ id });
        if (!query)
            throw HttpException.badRequest(
                'Please seed contact information first'
            );
        const updatedRecord = Object.assign(query, data);
        this.contactInfoRepo.save(updatedRecord);
        return;
    }
}

export default new ContactInformationService();
