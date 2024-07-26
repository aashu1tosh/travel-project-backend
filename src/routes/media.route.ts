import express from 'express';
import mediaController from './../controllers/media.controller';
import { authentication } from './../middleware/authentication.middleware';
import { catchAsync } from './../utils/catchAsync.utils';
import uploadFile from './../utils/fileUpload';
const router = express.Router();

router.use(authentication());

// route for uploading multiple files
router.post('/', uploadFile.array('file'), catchAsync(mediaController.create));

// route for uploading single file
router.post(
    '/single',
    uploadFile.single('file'),
    catchAsync(mediaController.createSingle)
);

export default router;
