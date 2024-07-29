import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import { Message, createdMessage } from './../constant/messages';
import teamMemberService from './../services/teamMember.service';

class TeamMemberController {
    async addTeamMember(req: Request, res: Response) {
        const response = await teamMemberService.createTeamMember(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: createdMessage('Team Member'),
        });
    }

    async deleteTeamMember(req: Request, res: Response) {
        const id = req?.params?.id;
        await teamMemberService.deleteTeamMember(id);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.deleted,
        });
    }
}

export default TeamMemberController;
