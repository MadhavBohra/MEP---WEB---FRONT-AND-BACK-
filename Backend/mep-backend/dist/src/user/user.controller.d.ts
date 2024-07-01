import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(user: Partial<User>): Promise<User>;
    findOne(id: number): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
