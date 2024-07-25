import { Column, Entity } from 'typeorm';
import Base from './base.entity';

@Entity('contact_form')
export class ContactForm extends Base {
    @Column({ name: 'full_name' })
    fullName: string;

    @Column()
    email: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column()
    subject: string;

    @Column()
    message: string;
}
