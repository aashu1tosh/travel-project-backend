import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import userService from './../services/user.service';

class UserController {
    async newsLetter(req: Request, res: Response) {
        const email = req?.body?.email
        await userService.newsLetter(email)
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "You have successfully subscribed to news letter"
        });
    }

}

export default UserController;
