import { type Request, type Response } from 'express';
import {
    CreatedMessage,
    Message,
    UpdatedMessage,
    deletedMessage,
} from './../constant/messages';
import { StatusCodes } from './../constant/statusCodes';
import adminService from './../services/admin.service';
import contactInformationService from './../services/contactInformation.service';
import testimonialService from './../services/testimonial.service';
import { getPaginationData, paginationValidator } from './../utils/pagination';

class AdminController {
    async getAllUser(req: Request, res: Response) {
        const [page, perpage] = paginationValidator(
            req.query.page as string,
            req.query.perpage as string
        );
        const response = await adminService.getAllUser(page, perpage);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: {
                data: response.data,
                pagination: getPaginationData(response.total, page, perpage),
            },
        });
    }

    async getUserById(req: Request, res: Response) {
        const id = req.params.id;
        const response = await adminService.getUserById(id);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response,
        });
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;
        await adminService.deleteUser(id);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: deletedMessage('User'),
        });
    }

    async updateContactInformation(req: Request, res: Response) {
        const { id, ...body } = req.body;
        await contactInformationService.updateContactInformation(id, body);
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: UpdatedMessage('Contact Information'),
        });
    }

    async addTestimonials(req: Request, res: Response) {
        await testimonialService.addTestimonials(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: CreatedMessage('New testimonials'),
        });
    }
}

export default AdminController;
