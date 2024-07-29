import express from 'express';
import { ROLE } from './../constant/enum';
import TeamMemberController from './../controllers/teamMember.controller';
import { AddTeamMemberDTO } from './../dto/teamMember.dto';
import RequestValidator from './../middleware/Request.Validator';
import { authentication } from './../middleware/authentication.middleware';
import { authorization } from './../middleware/authorization.middleware';
import { catchAsync } from './../utils/catchAsync.utils';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

const teamMemberController = new TeamMemberController();

router.post(
    '/',
    RequestValidator.validate(AddTeamMemberDTO),
    catchAsync(teamMemberController.addTeamMember)
);

router.delete(
    '/:id',
    catchAsync(teamMemberController.deleteTeamMember)
);


export default router;