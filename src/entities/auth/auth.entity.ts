import { Column, Entity, OneToOne } from 'typeorm';
import Base from '../base.entity';
import { ROLE } from './../../constant/enum';
import { AuthDetails } from './details.entity';

@Entity('auth')
export class Auth extends Base {
    @Column({
        unique: true,
    })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: ROLE,
    })
    role: ROLE;

    @OneToOne(() => AuthDetails, (details) => details.auth, { cascade: true })
    details: AuthDetails;

    @Column({ nullable: true, select: false })
    token: string;

    @Column({ name: 'otp_verified', default: false, select: false })
    otpVerified: boolean;
}
