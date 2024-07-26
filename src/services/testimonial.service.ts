import { AppDataSource } from '../config/database.config';
import { Testimonial } from './../entities/testimonial.entity';

class TestimonialService {
    constructor(
        private readonly testimonialRepo = AppDataSource.getRepository(
            Testimonial
        )
    ) {}

    async addTestimonials(data: Testimonial) {
        console.log('🚀 ~ TestimonialService ~ addTestimonials ~ data:', data);
        const write = this.testimonialRepo.create(data);
        const response = await this.testimonialRepo.save(write);
    }

    async deleteTestimonials(id: string) {}
}

export default new TestimonialService();
