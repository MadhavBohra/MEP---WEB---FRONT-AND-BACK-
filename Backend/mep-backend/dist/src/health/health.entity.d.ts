import { User } from '../user/user.entity';
export declare class Health {
    id: number;
    steps: number;
    calories: number;
    water_intake: number;
    user: User;
    date: Date;
}
