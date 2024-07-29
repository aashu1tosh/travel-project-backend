import express from 'express';
import { catchAsync } from '../utils/catchAsync.utils';
import UserController from './../controllers/user.controller';
import { ContactFormDTO, EmailOnlyDTO } from './../dto/user.dto';
import RequestValidator from './../middleware/Request.Validator';

const router = express.Router();

const userController = new UserController();

router.post(
    '/news-letter',
    RequestValidator.validate(EmailOnlyDTO),
    catchAsync(userController.newsLetter)
);

router.post(
    '/contact-form',
    RequestValidator.validate(ContactFormDTO),
    catchAsync(userController.contactForm)
);

export default router;
