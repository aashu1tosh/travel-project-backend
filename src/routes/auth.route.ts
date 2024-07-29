import express from 'express';
import AuthController from '../controllers/auth.controller';
import {
    CreateUserDTO,
    LoginUserDTO,
    RequestEmailVerificationDTO,
    UpdatePasswordDTO,
} from '../dto/auth.dto';
import RequestValidator from '../middleware/Request.Validator';
import { catchAsync } from '../utils/catchAsync.utils';
import { authentication } from './../middleware/authentication.middleware';

const router = express.Router();

const authController = new AuthController();

router.post(
    '/register',
    RequestValidator.validate(CreateUserDTO),
    catchAsync(authController.createUser)
);

router.post(
    '/request-verification',
    RequestValidator.validate(RequestEmailVerificationDTO),
    catchAsync(authController.requestVerification)
);

router.get('/verify/:token', catchAsync(authController.verifyEmail));

router.post(
    '/login',
    RequestValidator.validate(LoginUserDTO),
    catchAsync(authController.login)
);

router.use(authentication());
router.patch(
    '/update-password',
    RequestValidator.validate(UpdatePasswordDTO),
    catchAsync(authController.updatePassword)
);

export default router;
