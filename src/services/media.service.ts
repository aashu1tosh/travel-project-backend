// import { MediaType } from 'express';
import { AppDataSource } from './../config/database.config';
import { MediaType } from './../constant/enum';
import { Auth } from './../entities/auth/auth.entity';
import Media from './../entities/media.entity';
import HttpException from './../utils/HttpException.utils';

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

    async getMediaById(id: string) {
        return await this.mediaRepo.findOneBy({ id: id });
    }

    async deleteMediaService(id: string) {
        try {
            console.log(this.getMediaById(id));
            // const imageDelete = await deleteMedia(filepath);
            // if (imageDelete) {
            //     const item = await this.media
            //         .createQueryBuilder('media')
            //         .delete()
            //         .from(Media)
            //         .where('id = :id', {
            //             id: id,
            //         })
            //         .execute();
            //     return item?.affected;
            // }
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new MediaService();
