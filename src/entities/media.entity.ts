import fs from 'fs';
import path from 'path';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DotenvConfig } from '../config/env.config';
import { MediaType } from '../constant/enum';
import { getTempFolderPath, getUploadFolderPath } from './../utils/path.utils';
import { Auth } from './auth/auth.entity';
import Base from './base.entity';

@Entity('media')
class Media extends Base {
    @Column({ nullable: true })
    name: string;

    @Column({
        name: 'mime_type',
    })
    mimeType: string;

    @Column({ enum: MediaType, type: 'enum' })
    type: MediaType;

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'auth_id' })
    auth: Auth;

    // @OneToOne(() => Testimonial, { cascade: true, onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'testimonial_id' })
    // testimonial: Auth;

    /**
     * Moves an image file from the temporary folder to the upload folder.
     *
     * @param id - The identifier associated with the image.
     * @param type - The type of the image (e.g., "RESOURCES", "EMPLOYEE").
     */
    public path: string;
    transferImageFromTempToUploadFolder(id: string, type: MediaType): void {
        // Define the path to the temporary folder where the image is currently stored.
        const TEMP_FOLDER_PATH = path.join(getTempFolderPath(), this.name);
        // Define the path to the target upload folder based on the image type and identifier.
        // const UPLOAD_FOLDER_PATH = path.join(getUploadFolderPath(), type.toLowerCase(), id.toString())

        // Define the path to the target upload folder based on the image type.
        const UPLOAD_FOLDER_PATH = path.join(
            getUploadFolderPath(),
            type.toLowerCase()
        );
        // Create the target upload folder if it doesn't exist.
        !fs.existsSync(UPLOAD_FOLDER_PATH) &&
            fs.mkdirSync(UPLOAD_FOLDER_PATH, { recursive: true });
        // Move the image file from the temporary folder to the upload folder.
        fs.renameSync(
            TEMP_FOLDER_PATH,
            path.join(UPLOAD_FOLDER_PATH, this.name)
        );
    }

    /**
     * After loading the entity, this method generates the complete image path based on entity properties.
     * It sets the 'path' property to the constructed image URL.
     */
    @AfterLoad()
    async loadImagePath(): Promise<void> {
        // Construct the image path using the BASE_URL, type, id, and name properties.
        this.path = `${DotenvConfig.BACKEND_URL}${this.type.toLowerCase()}/${this.name}`;
    }
}

export default Media;
