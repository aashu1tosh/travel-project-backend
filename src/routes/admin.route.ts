import express from 'express';
import { ROLE } from './../constant/enum';
import AdminController from './../controllers/admin.controller';
import { ContactInformationDTO, TestimonialDTO } from './../dto/admin.dto';
import RequestValidator from './../middleware/Request.Validator';
import { authentication } from './../middleware/authentication.middleware';
import { authorization } from './../middleware/authorization.middleware';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

const adminController = new AdminController();

// user related tasks
router.get('/users', catchAsync(adminController.getAllUser));
router.get('/user/:id', catchAsync(adminController.getUserById));
router.delete('/users/:id', catchAsync(adminController.deleteUser));

// update contact information
router.patch(
    '/contact-information',
    RequestValidator.validate(ContactInformationDTO),
    catchAsync(adminController.updateContactInformation)
);
// to post testimonials
router.post(
    '/testimonials',
    RequestValidator.validate(TestimonialDTO),
    catchAsync(adminController.addTestimonials)
);

export default router;
