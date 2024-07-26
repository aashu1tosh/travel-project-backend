import express from 'express';
import mediaController from './../controllers/media.controller';
import { catchAsync } from './../utils/catchAsync.utils';
import uploadFile from './../utils/fileUpload';
const router = express.Router();

router.post('/', uploadFile.array('file'), catchAsync(mediaController.create));
router.post(
    '/single',
    uploadFile.single('file'),
    catchAsync(mediaController.createSingle)
);

export default router;
