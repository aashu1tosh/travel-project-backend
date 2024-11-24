import cors from 'cors';
import express, {
    Application,
    NextFunction,
    type Response,
    type Request,
} from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { DotenvConfig } from '../config/env.config';
import routes from '../routes/index.route';
import { StatusCodes } from './../constant/statusCodes';
import { errorHandler } from './errorHandler.middleware';

const middleware = (app: Application) => {
    const allowedOrigins = DotenvConfig.CORS_ORIGIN;
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message:
            'Too many requests from this IP, please try again after 15 minutes.',
        headers: true, // Send rate limit info in response headers
    });

    app.use(
        cors({
            origin: allowedOrigins,
            allowedHeaders: [
                'access-control-allow-origin',
                'authorization',
                'contact',
                'content-type',
            ],
        })
    );

    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

    // Apply rate limiting middleware to all requests
    // app.use(limiter);

    app.use((req: Request, res: Response, next: NextFunction) => {
        const userAgent = req.headers['user-agent'];
        const apiKey = req.headers['x-api-key'];
        if (userAgent && userAgent.includes('Mozilla')) {
            next();
        } else {
            if (apiKey === DotenvConfig.API_KEY) next();
            else res.status(StatusCodes.FORBIDDEN).send('Forbidden');
        }
    });

    app.use(
        express.json({
            limit: '10mb',
        })
    );
    app.use(morgan('common'));
    app.use('/api/v1', routes);
    app.use(express.static(path.join(__dirname, '../', '../', 'public/')));
    app.use(express.static(path.join(__dirname, '../../', 'frontend-dist')));
    app.get('*', (_, res: Response) => {
        res.sendFile(
            path.join(__dirname, '../../', 'frontend-dist', 'index.html')
        );
    });
    app.use(errorHandler);
};

export default middleware;
