import { AppDataSource } from '../config/database.config';
import { Testimonial } from './../entities/testimonial.entity';
import HttpException from './../utils/HttpException.utils';
import mediaService from './media.service';

class TestimonialService {
    constructor(
        private readonly testimonialRepo = AppDataSource.getRepository(
            Testimonial
        )
    ) { }

    async getTestimonials(page: number, perpage: number) {
        const query = this.testimonialRepo
            .createQueryBuilder('testimonial')
            .leftJoinAndSelect('testimonial.media', 'media')
        query
            .orderBy('testimonial.createdAt', 'DESC')
            .limit(perpage)
            .offset((page - 1) * perpage);
        const [data, total] = await query.getManyAndCount();

        return { data, total }
    }

    async addTestimonials(data: Testimonial) {
        try {
            const query = await this.testimonialRepo
                .createQueryBuilder('testimonial')
                .leftJoinAndSelect('testimonial.media', 'media')
                .where('media.id = :id', { id: data?.id })
                .getOne();

            if (query)
                throw HttpException.badRequest('Media can not be reused');

            const write = this.testimonialRepo.create(data);

            const response = await this.testimonialRepo.save(write);
            return response;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteTestimonials(id: string) {
        const response = await this.testimonialRepo
            .createQueryBuilder('testimonial')
            .leftJoinAndSelect('testimonial.media', 'media')
            .where('testimonial.id = :id', { id })
            .getOne();

        if (!response)
            throw HttpException.badRequest('Invalid testimonial id.');

        await this.testimonialRepo
            .createQueryBuilder('testimonial')
            .delete()
            .where('testimonial.id = :id', { id })
            .execute();

        await mediaService.deleteMedia(response?.media?.id as string);
    }
}

export default new TestimonialService();
