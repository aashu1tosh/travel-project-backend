import express from 'express';
import { ROLE } from './../constant/enum';
import CompanyController from './../controllers/company.controller';
import { CompanyAddDTO, CompanyUpdateDTO } from './../dto/company.dto';
import RequestValidator from './../middleware/Request.Validator';
import { authentication } from './../middleware/authentication.middleware';
import { authorization } from './../middleware/authorization.middleware';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();
const companyController = new CompanyController();

router.get('/', catchAsync(companyController.getCompanyInformation));

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

router.post(
    '/',
    RequestValidator.validate(CompanyAddDTO),
    catchAsync(companyController.addCompanyInformation)
);

router.patch(
    '/',
    RequestValidator.validate(CompanyUpdateDTO),
    catchAsync(companyController.updateCompanyInformation)
);

export default router;
