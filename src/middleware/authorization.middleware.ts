import { type NextFunction, type Request, type Response } from 'express';
import { type ROLE } from '../constant/enum';
import { Message } from '../constant/messages';
import HttpException from '../utils/HttpException.utils';

export const authorization = (roles: ROLE[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) throw HttpException.unauthorized(Message.notAuthorized);
        try {
            const userRole = req.user.role;
            if (userRole && roles.includes(userRole as ROLE)) next();
            else throw HttpException.unauthorized(Message.notAuthorized);
        } catch (err: any) {
            throw HttpException.unauthorized(Message.notAuthorized);
        }
    };
};
