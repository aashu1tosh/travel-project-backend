import { Column, Entity } from 'typeorm';
import Base from './base.entity';

@Entity('news_letter')
export class NewsLetter extends Base {
    @Column({ unique: true })
    email: string;

    @Column({ default: true })
    subscribed: boolean;
}
