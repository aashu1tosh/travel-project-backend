import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Base from './base.entity';
import Media from './media.entity';

@Entity('company')
export class Company extends Base {
    @Column({ nullable: true })
    description: string;

    @Column()
    slogan: string;

    @OneToOne(() => Media, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'media_id', referencedColumnName: 'id' })
    media: Media;
}
