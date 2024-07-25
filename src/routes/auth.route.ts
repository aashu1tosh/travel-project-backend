import express from 'express';
import AuthController from '../controllers/auth.controller';
import {
    CreateUserDTO,
    LoginUserDTO,
    RequestEmailVerificationDTO,
} from '../dto/auth.dto';
import RequestValidator from '../middleware/Request.Validator';
import { catchAsync } from '../utils/catchAsync.utils';

const router = express.Router();

const authController = new AuthController();
// Endpoint for creating user
router.post(
    '/register',
    RequestValidator.validate(CreateUserDTO),
    catchAsync(authController.createUser)
);

//
router.post(
    '/request-verification',
    RequestValidator.validate(RequestEmailVerificationDTO),
    catchAsync(authController.requestVerification)
);

//Endpoint for verification email
router.get('/verify/:token', catchAsync(authController.verifyEmail));

router.post(
    '/login',
    RequestValidator.validate(LoginUserDTO),
    catchAsync(authController.login)
);

export default router;
