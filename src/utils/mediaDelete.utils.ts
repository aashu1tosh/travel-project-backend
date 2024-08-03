import fs from 'fs';
import path from 'path';
import { DotenvConfig } from './../config/env.config';
import Print from './print';

export const deleteMedia = (filepath: string): Promise<boolean> => {
    const mediaPath = filepath.split(DotenvConfig.PORT.toString())[1];
    const imagePath = path
        .join(__dirname, '../', '../', './public/')
        .concat(mediaPath);

    return new Promise((resolve, reject) => {
        fs.unlink(imagePath, (error) => {
            if (error) {
                Print.error(error.message);
                resolve(false); // Resolve with false if there's an error
            } else {
                resolve(true); // Resolve with true if the file was successfully deleted
            }
        });
    });
};
