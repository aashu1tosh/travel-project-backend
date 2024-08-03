import { AppDataSource } from './../config/database.config';
import { MediaType } from './../constant/enum';
import { Auth } from './../entities/auth/auth.entity';
import Media from './../entities/media.entity';
import HttpException from './../utils/HttpException.utils';
import { deleteMedia } from './../utils/mediaDelete.utils';

class MediaService {
    teamMemberRepo: any;
    constructor(
        private readonly mediaRepo = AppDataSource.getRepository(Media)
    ) {}

    async create(name: string, mimeType: string, type: MediaType, id: string) {
        const data = this.mediaRepo.create();
        data.name = name;
        data.mimeType = mimeType;
        data.type = type;
        data.auth = { id } as Auth;
        const response = await this.mediaRepo.save(data);
        response.transferImageFromTempToUploadFolder(
            response.id as string,
            response.type
        );
        return response;
    }

    async getMediaById(id: string) {
        return await this.mediaRepo.findOneBy({ id: id });
    }

    async deleteMedia(id: string) {
        try {
            const response = await this.mediaRepo.findOneBy({ id });
            if (!response)
                throw HttpException.badRequest('Invalid team member id.');
            await this.mediaRepo.remove(response);
            await deleteMedia(response?.path);
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new MediaService();
