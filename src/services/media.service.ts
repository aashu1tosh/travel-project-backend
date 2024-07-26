// import { MediaType } from 'express';
import { AppDataSource } from './../config/database.config';
import { MediaType } from './../constant/enum';
import { Auth } from './../entities/auth/auth.entity';
import Media from './../entities/media.entity';

class MediaService {
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
}

export default new MediaService();
