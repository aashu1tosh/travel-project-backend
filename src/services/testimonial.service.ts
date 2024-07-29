import { AppDataSource } from '../config/database.config';
import { Testimonial } from './../entities/testimonial.entity';
import HttpException from './../utils/HttpException.utils';

class TestimonialService {
    constructor(
        private readonly testimonialRepo = AppDataSource.getRepository(
            Testimonial
        )
    ) {}

    async addTestimonials(data: Testimonial) {
        const write = this.testimonialRepo.create(data);
        const response = await this.testimonialRepo.save(write);
    }

    async deleteTestimonials(id: string) {
        const response = await this.testimonialRepo
            .createQueryBuilder('testimonial')
            .leftJoinAndSelect('testimonial.media', 'media')
            .where('testimonial.id = :id', { id })
            .getOne();
        console.log(
            '🚀 ~ TestimonialService ~ deleteTestimonials ~ response:',
            response
        );
        if (!response)
            throw HttpException.badRequest('Invalid testimonial id.');
        // if(response.media) await mediaService.deleteMediaService(response.media as string)
        // await this.testimonialRepo.remove(response);
    }
}

export default new TestimonialService();
