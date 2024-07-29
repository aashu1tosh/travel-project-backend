import HttpException from '../utils/HttpException.utils';
import { AppDataSource } from './../config/database.config';
import { TeamMember } from './../entities/teamMember.entity';

class TeamMemberService {
    constructor(
        private readonly teamMemberRepo = AppDataSource.getRepository(
            TeamMember
        )
    ) {}

    async createTeamMember(data: TeamMember) {
        try {
            const team = this.teamMemberRepo.create(data);
            this.teamMemberRepo.save(team);
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteTeamMember(id: string) {
        try {
            const response = await this.teamMemberRepo.findOneBy({ id });
            if (!response)
                throw HttpException.badRequest('Invalid team member id.');
            await this.teamMemberRepo.remove(response);
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new TeamMemberService();
