import { Column, Entity } from 'typeorm';
import Base from './base.entity';

@Entity('contact_information')
export class ContactInformation extends Base {
    @Column()
    location: string;

    @Column()
    lat: string;

    @Column()
    long: string;

    @Column()
    email: string;

    @Column({ name: 'available_days' })
    availableDays: string;

    @Column({ name: 'available_time' })
    availableTime: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'secondary_phone_number' })
    secondaryPhoneNumber: string;

    @Column({ name: 'facebook_link' })
    facebookLink: string;

    @Column({ name: 'instagram_link' })
    instagramLink: string;

    @Column({ name: 'twitter_link' })
    twitterLink: string;
}
