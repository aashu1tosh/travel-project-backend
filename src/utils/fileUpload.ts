import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { DotenvConfig } from './../config/env.config';
import { Environment, MediaType } from './../constant/enum';
import HttpException from './HttpException.utils';

const uploadsDirectory = 'public/uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderPath = '';

        if (!req.body.type)
            return cb(HttpException.badRequest('Choose File Type'), '');
        if (!MediaType[req.body.type as keyof typeof MediaType])
            return cb(HttpException.badRequest('Invalid file type'), '');

        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            folderPath = path.join(process.cwd(), 'public', 'uploads', 'temp');
        else
            folderPath = path.resolve(
                process.cwd(),
                'public',
                'uploads',
                'temp'
            );

        !fs.existsSync(folderPath) &&
            fs.mkdirSync(folderPath, { recursive: true });
        cb(null, folderPath);
    },
    filename: (_req, file, cb) => {
        const fileName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            '.' +
            file.mimetype.split('/').pop();
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // limit file size to 10MB
    },
});
export default upload;
