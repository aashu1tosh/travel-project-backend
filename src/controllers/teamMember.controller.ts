import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import { Message, createdMessage } from './../constant/messages';
import teamMemberService from './../services/teamMember.service';

class TeamMemberController {
    async addTeamMember(req: Request, res: Response) {
        console.log(req.body)
        const response = await teamMemberService.createTeamMember(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: createdMessage('Team Member'),
            data: response
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

    async getTeamMembers(req: Request, res: Response) {
        const perPage = req.query.perPage as unknown;
        const response = await teamMemberService.getTeamMembers(
            perPage as number
        );
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response,
        });
    }
}

export default TeamMemberController;
