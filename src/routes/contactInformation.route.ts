import express from 'express';
import CompanyInformationController from './../controllers/contactInformation';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();
const companyInformationController = new CompanyInformationController();

router.get('/', catchAsync(companyInformationController.getCompanyInformation));

export default router;
