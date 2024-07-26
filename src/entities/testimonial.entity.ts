import { Max, Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Base from './base.entity';
import Media from './media.entity';

@Entity('testimonial')
export class Testimonial extends Base {
    @Column({ name: 'full_name' })
    fullName: string;

    @Column()
    testimonial: string;

    @Column({ name: 'reviewer_location' })
    reviewerLocation: string;

    @Column()
    @Min(1)
    @Max(5)
    rating: number;

    @OneToOne(() => Media, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'media_id', referencedColumnName: 'id' })
    media: Media;
}
