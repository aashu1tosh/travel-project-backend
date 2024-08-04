import { type Request, type Response } from 'express';
import {
    Message,
    createdMessage,
    deletedMessage,
} from './../constant/messages';
import { StatusCodes } from './../constant/statusCodes';
import testimonialService from './../services/testimonial.service';
import { paginationValidator } from './../utils/pagination';

class TestimonialController {
    async getTestimonials(req: Request, res: Response) {
        const [page, perpage] = paginationValidator(
            req.query.page as string,
            req.query.perpage as string
        );
        const response = await testimonialService.getTestimonials(
            page,
            perpage
        );
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response,
        });
    }

    async addTestimonials(req: Request, res: Response) {
        const response = await testimonialService.addTestimonials(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: createdMessage('New testimonials'),
            data: response
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
