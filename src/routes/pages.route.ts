import express from 'express';
import { ROLE } from './../constant/enum';
import PagesController from './../controllers/pages.controller';
import { PageAddDTO, PageUpdateDTO } from './../dto/page.dto';
import RequestValidator from './../middleware/Request.Validator';
import { authentication } from './../middleware/authentication.middleware';
import { authorization } from './../middleware/authorization.middleware';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();

const pagesController = new PagesController();

router.get('/:page', catchAsync(pagesController.getPageInformation));

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

router.post(
    '/',
    RequestValidator.validate(PageAddDTO),
    catchAsync(pagesController.postPageInformation)
);

router.patch(
    '/',
    RequestValidator.validate(PageUpdateDTO),
    catchAsync(pagesController.updatePageInformation)
);

export default router;
