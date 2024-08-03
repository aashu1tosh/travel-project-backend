import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PAGE } from './../constant/enum';
import Base from './base.entity';
import Media from './media.entity';

@Entity('pages')
export class Pages extends Base {
    @Column({
        type: 'enum',
        enum: PAGE,
    })
    page: string;

    @Column()
    slogan: string;

    @OneToOne(() => Media, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'media_id', referencedColumnName: 'id' })
    media: Media;
}
