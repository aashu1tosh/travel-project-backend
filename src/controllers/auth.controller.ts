import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import { default as authServices } from '../services/auth.service';
import { Message } from './../constant/messages';

class AuthController {
    async createUser(req: Request, res: Response) {
        const response = await authServices.createUser(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: response,
        });
    }

    async login(req: Request, res: Response) {
        const response = await authServices.login(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: Message.loginSuccessfully,
            data: response,
        });
    }
}

export default AuthController;
