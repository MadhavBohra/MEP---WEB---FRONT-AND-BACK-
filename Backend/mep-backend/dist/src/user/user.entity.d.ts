import { Health } from 'src/health/health.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    health: Health[];
}
