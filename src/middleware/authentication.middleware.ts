import { type NextFunction, type Request, type Response } from 'express';
import { DotenvConfig } from '../config/env.config';
import { Message } from '../constant/messages';
import tokenService from '../services/webToken.service';
import HttpException from '../utils/HttpException.utils';

export const authentication = () => {
    return (req: Request, _: Response, next: NextFunction) => {
        const tokens = req.headers.authorization?.split(' ');

        try {
            if (!tokens) {
                throw HttpException.unauthorized(Message.notAuthorized);
            }
            const mode = tokens[0];
            const accessToken = tokens[1];
            if (mode !== 'Bearer' || !accessToken)
                throw HttpException.unauthorized(Message.notAuthorized);
            const payload = tokenService.verify(
                accessToken,
                DotenvConfig.ACCESS_TOKEN_SECRET
            );
            if (payload) {
                req.user = payload;
                next();
            } else {
                throw HttpException.unauthorized(Message.notAuthorized);
            }
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                next(HttpException.unauthorized(Message.tokenExpire));
                return;
            }
            next(HttpException.unauthorized(Message.notAuthorized));
        }
    };
};
