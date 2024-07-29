import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Base from './base.entity';
import Media from './media.entity';

@Entity('team_member')
export class TeamMember extends Base {
    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column()
    email: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column()
    position: string;

    @Column()
    order: number;

    @OneToOne(() => Media, { cascade: true })
    @JoinColumn({ name: 'media_id' })
    media: string;
}
