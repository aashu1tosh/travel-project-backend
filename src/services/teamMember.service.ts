import HttpException from '../utils/HttpException.utils';
import { AppDataSource } from './../config/database.config';
import { TeamMember } from './../entities/teamMember.entity';
import mediaService from './media.service';

class TeamMemberService {
    constructor(
        private readonly teamMemberRepo = AppDataSource.getRepository(
            TeamMember
        )
    ) { }

    async createTeamMember(data: TeamMember) {
        try {
            const query = await this.teamMemberRepo
                .createQueryBuilder('team')
                .leftJoinAndSelect('team.media', 'media')
                .where('media.id = :id', { id: data?.id })
                .getOne();

            if (!query?.media)
                throw HttpException.badRequest('Media can not be reused');

            const team = this.teamMemberRepo.create(data);
            this.teamMemberRepo.save(team);
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteTeamMember(id: string) {
        try {
            const response = await this.teamMemberRepo.findOne({
                where: { id },
                relations: ['media']
            });
            if (!response)
                throw HttpException.badRequest('Invalid team member id.');
            await this.teamMemberRepo.remove(response);
            await mediaService.deleteMedia(response?.media?.id as string)
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async getTeamMembers(perPage: number | null) {
        try {
            const response = await this.teamMemberRepo.find({
                relations: ['media'],
                order: {
                    order: 'ASC',
                },
                take: perPage ?? 3,
            });

            if (!response)
                throw HttpException.badRequest('No Team Member found');
            return response;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new TeamMemberService();
