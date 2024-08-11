import { AppDataSource } from '../config/database.config';
import { PAGE } from './../constant/enum';
import { Pages } from './../entities/pages.entity';
import HttpException from './../utils/HttpException.utils';
import mediaService from './media.service';

class PagesService {
    constructor(
        private readonly pagesRepo = AppDataSource.getRepository(Pages)
    ) {}

    async getPageInformation(page: PAGE) {
        const response = await this.pagesRepo
            .createQueryBuilder('page')
            .leftJoinAndSelect('page.media', 'media')
            .where('page.page = :page', { page: page })
            .getOne();

        if (!response) throw HttpException.badRequest(`${page} doesn't exist`);
        return response;
    }

    async postPageInformation(data: Pages) {
        const query = await this.pagesRepo
            .createQueryBuilder('page')
            .leftJoinAndSelect('page.media', 'media')
            .where('media.id = :id', { id: data?.id })
            .getOne();

        if (query) throw HttpException.badRequest('Media can not be reused');
        const check = await this.pagesRepo.findOneBy({ page: data?.page });

        if (check) {
            if (check?.media?.id !== (data?.media as unknown as string)) {
                Object.assign(check, data);
            } else {
                await mediaService.deleteMedia(check?.media.id);
            }
            await this.pagesRepo.save(check);
        } else {
            const query = this.pagesRepo.create(data);
            await this.pagesRepo.save(query);
        }

        const response = this.getPageInformation(data?.page as PAGE);
        return response;
    }

    async updatePageInformation(data: Pages) {}
}

export default new PagesService();
