import jwt from 'jsonwebtoken';
import { DotenvConfig } from '../config/env.config';
import { ROLE } from '../constant/enum';
import {
    type IJwtOptions,
    type IJwtPayload,
} from '../interface/jwt.interfaces';

class WebTokenService {
    sign(user: IJwtPayload, options: IJwtOptions, role: ROLE): string {
        return jwt.sign(
            {
                id: user.id,
                role,
            },
            options.secret,
            {
                expiresIn: options.expiresIn,
            }
        );
    }

    verify(token: string, secret: string): any {
        return jwt.verify(token, secret);
    }

    generateAccessToken(user: IJwtPayload, role: ROLE): string {
        return this.sign(
            user,
            {
                expiresIn: DotenvConfig.ACCESS_TOKEN_EXPIRES_IN,
                secret: DotenvConfig.ACCESS_TOKEN_SECRET,
            },
            role
        );
    }

    generateTokens(
        user: IJwtPayload,
        role: ROLE
    ): { accessToken: string; refreshToken: string } {
        const accessToken = this.sign(
            user,
            {
                expiresIn: DotenvConfig.ACCESS_TOKEN_EXPIRES_IN,
                secret: DotenvConfig.ACCESS_TOKEN_SECRET,
            },
            role
        );

        const refreshToken = this.sign(
            user,
            {
                expiresIn: DotenvConfig.REFRESH_TOKEN_EXPIRES_IN,
                secret: DotenvConfig.REFRESH_TOKEN_SECRET,
            },
            role
        );
        return { accessToken, refreshToken };
    }

    // generateTokensForSubscription(id: string, expiresDate: string): string {
    //     const expiresIn = daysSince(expiresDate)
    //     return jwt.sign({ id }, DotenvConfig.ACCESS_TOKEN_SECRET, {
    //         expiresIn,
    //     })
    // }
}

export default new WebTokenService();
