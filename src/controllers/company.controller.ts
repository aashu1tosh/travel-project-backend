import { type Request, type Response } from 'express';
import { updatedMessage } from './../constant/messages';
import { StatusCodes } from './../constant/statusCodes';
import companyService from './../services/company.service';

class CompanyController {
    async getCompanyInformation(req: Request, res: Response) {
        const response = await companyService.getCompany();
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Company Information fetched successfully',
            data: response,
        });
    }
    async addCompanyInformation(req: Request, res: Response) {
        const response = await companyService.addCompany(req?.body);
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: 'Company Information added successfully',
            data: response,
        });
    }

    async updateCompanyInformation(req: Request, res: Response) {
        const { id, ...body } = req.body;
        await companyService.updateCompany(id, body);
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: updatedMessage('Company Information'),
        });
    }
}

export default CompanyController;
