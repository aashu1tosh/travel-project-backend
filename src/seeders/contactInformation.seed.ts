import { AppDataSource } from '../config/database.config';
import Print from '../utils/print';
import { contactInformation } from './../constant/contactInformation';
import { ContactInformation } from './../entities/contactInformation.entity';
import { IContactInformation } from './../interface/contactInformation.interface';

async function seedContactInformation(data: IContactInformation) {
    try {
        await AppDataSource.initialize();
        const contactInformation =
            AppDataSource.getRepository(ContactInformation);
        await contactInformation.clear();
        Print.warn('All contact information is cleared');
        const query = contactInformation.create(data);
        await contactInformation.save(query);
        Print.info('Contact Information seeded successfully');
    } catch (error) {
        Print.error('Seeding Contact Information Failed');
        console.error(error);
    } finally {
        process.exit(0);
    }
}

const args = process.argv[2];
if (!args) {
    console.error('Please provide an argument');
    process.exit(1);
}

if (args === 'seed') {
    void seedContactInformation(contactInformation);
} else {
    console.error('Invalid argument');
    process.exit(1);
}
