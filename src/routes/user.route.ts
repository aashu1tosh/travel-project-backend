import express from 'express';
import { catchAsync } from '../utils/catchAsync.utils';
import UserController from './../controllers/user.controller';
import { EmailOnlyDto } from './../dto/user.dto';
import RequestValidator from './../middleware/Request.Validator';
// import { EmailOnlyDto } from 'dto/user.dto';

const router = express.Router();

const userController = new UserController();
// Endpoint for creating user
router.post(
    '/news-letter',
    RequestValidator.validate(EmailOnlyDto),
    catchAsync(userController.newsLetter)
);

export default router;
