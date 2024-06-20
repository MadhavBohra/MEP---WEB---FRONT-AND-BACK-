import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(registerUserDto: RegisterUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        profilePicture: string;
    }>;
    findAll(): Promise<{
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
    findByEmail(email: string): Promise<{
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
