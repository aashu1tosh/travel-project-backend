import { type Request, type Response } from 'express';
import { Message } from '../constant/messages';
import { StatusCodes } from '../constant/statusCodes';
import HttpException from '../utils/HttpException.utils';
import { MediaType } from './../constant/enum';
import mediaService from './../services/media.service';

class MediaController {
    async create(req: Request, res: Response) {
        if (req?.files?.length === 0)
            throw HttpException.badRequest('Sorry file could not be uploaded.');

        const files = req?.files;
        const authId = req?.user?.id as string;
        const idList = Array.isArray(files)
            ? await Promise.all(
                  files?.map(async (file: any) => {
                      const name = file?.filename;
                      const mimeType = file?.mimetype;
                      const type = req.body?.type as MediaType;
                      const response = await mediaService.create(
                          name,
                          mimeType,
                          type,
                          authId
                      );
                      return response.id;
                  })
              )
            : HttpException.internalServerError('Media upload failed');

        const data = { mediaId: idList };
        res.status(StatusCodes.CREATED).json({
            status: true,
            message: Message.created,
            data: data,
        });
    }

    async createSingle(req: Request, res: Response) {
        const filesLength = req?.files?.length ?? 0;

        if (
            Array.isArray(req?.files) &&
            (req.files.length === 0 || req.files.length >= 2)
        )
            throw HttpException.badRequest('Sorry file could not be uploaded.');

        const file = req?.file;
        const authId = req?.user?.id as string;
        const name = file?.filename;
        const mimeType = file?.mimetype;
        const type = req.body?.type as MediaType;
        const response = await mediaService.create(
            name as string,
            mimeType as string,
            type,
            authId
        );

        const data = { mediaId: response.id };
        res.status(StatusCodes.CREATED).json({
            status: true,
            message: Message.created,
            data: data,
        });
    }
}

export default new MediaController();
