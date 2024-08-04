import express from 'express';
import { ROLE } from './../constant/enum';
import AdminController from './../controllers/admin.controller';
import { ContactInformationDTO } from './../dto/admin.dto';
import RequestValidator from './../middleware/Request.Validator';
import { authentication } from './../middleware/authentication.middleware';
import { authorization } from './../middleware/authorization.middleware';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

const adminController = new AdminController();

router.get('/users', catchAsync(adminController.getAllUser));
router.get('/user/:id', catchAsync(adminController.getUserById));
router.delete('/users/:id', catchAsync(adminController.deleteUser));

router.patch(
    '/contact-information',
    RequestValidator.validate(ContactInformationDTO),
    catchAsync(adminController.updateContactInformation)
);

router.get('/contact-form', catchAsync(adminController.getContactForms))

export default router;
