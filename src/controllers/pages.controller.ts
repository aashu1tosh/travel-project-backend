import { type Request, type Response } from 'express';
import { StatusCodes } from './../constant/statusCodes';
import pagesService from './../services/pages.service';
import { PAGE } from './../constant/enum';

class PagesController {
    async getPageInformation(req: Request, res: Response) {
        const page = req.params.page;
        const response = await pagesService.getPageInformation(page as PAGE);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: `${page} data fetched successfully`,
            data: response,
        });
    }

    async postPageInformation(req: Request, res: Response) {
        await pagesService.postPageInformation(req.body);
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: `Page data added successfully`,
        });
    }

    async updatePageInformation(req: Request, res: Response) {}
}

export default PagesController;
