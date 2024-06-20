import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerUserDto: RegisterUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        profilePicture: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        profilePicture: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        profilePicture: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        profilePicture: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        profilePicture: string;
    }>;
}
