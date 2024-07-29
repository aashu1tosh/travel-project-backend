import express from 'express';
import { ROLE } from './../constant/enum';
import AdminController from './../controllers/admin.controller';
import { TestimonialDTO } from './../dto/admin.dto';
import RequestValidator from './../middleware/Request.Validator';
import { authentication } from './../middleware/authentication.middleware';
import { authorization } from './../middleware/authorization.middleware';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

const adminController = new AdminController();

router.post(
    '/',
    RequestValidator.validate(TestimonialDTO),
    catchAsync(adminController.addTestimonials)
);

router.delete('/:id', catchAsync(adminController.deleteTestimonials));

export default router;
