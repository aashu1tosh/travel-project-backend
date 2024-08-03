import { type Request, type Response } from 'express';
import {
    Message,
    createdMessage,
    deletedMessage,
} from './../constant/messages';
import { StatusCodes } from './../constant/statusCodes';
import testimonialService from './../services/testimonial.service';

class TestimonialController {
    async getTestimonials(req: Request, res: Response) {
        const number = req.params.perPage as unknown;
        const response = await testimonialService.getTestimonials(
            number as number
        );
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response,
        });
    }

    async addTestimonials(req: Request, res: Response) {
        await testimonialService.addTestimonials(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: createdMessage('New testimonials'),
        });
    }

    async deleteTestimonials(req: Request, res: Response) {
        const id = req.params.id;
        await testimonialService.deleteTestimonials(id);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: deletedMessage('Testimonial'),
        });
    }
}

export default TestimonialController;
