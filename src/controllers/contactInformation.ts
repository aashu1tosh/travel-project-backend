import { type Request, type Response } from 'express';
import { StatusCodes } from './../constant/statusCodes';
import companyInformationService from './../services/companyInformation.service';

class CompanyInformationController {
    async getCompanyInformation(req: Request, res: Response) {
        const response = await companyInformationService.getCompany();
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Company Information fetched successfully',
            data: response,
        });
    }
}

export default CompanyInformationController;
