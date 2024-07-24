import jwt from 'jsonwebtoken';
import { DotenvConfig } from '../config/env.config';
import { type IJwtOptions } from '../interface/jwt.interfaces';
import { ROLE } from './../constant/enum';

export class WebTokenService {
    sign(id: string, options: IJwtOptions, role: ROLE): string {
        return jwt.sign(
            {
                id: id,
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

    generateAccessToken(id: string, role: ROLE): string {
        return this.sign(
            id,
            {
                expiresIn: DotenvConfig.ACCESS_TOKEN_EXPIRES_IN,
                secret: DotenvConfig.ACCESS_TOKEN_SECRET,
            },
            role
        );
    }

    generateTokens(
        id: string,
        role: ROLE
    ): { accessToken: string; refreshToken: string } {
        const accessToken = this.sign(
            id,
            {
                expiresIn: DotenvConfig.ACCESS_TOKEN_EXPIRES_IN,
                secret: DotenvConfig.ACCESS_TOKEN_SECRET,
            },
            role
        );

        const refreshToken = this.sign(
            id,
            {
                expiresIn: DotenvConfig.REFRESH_TOKEN_EXPIRES_IN,
                secret: DotenvConfig.REFRESH_TOKEN_SECRET,
            },
            role
        );
        return { accessToken, refreshToken };
    }
}
