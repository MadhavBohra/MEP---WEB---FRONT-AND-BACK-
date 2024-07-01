import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: Partial<User>): Promise<User>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
