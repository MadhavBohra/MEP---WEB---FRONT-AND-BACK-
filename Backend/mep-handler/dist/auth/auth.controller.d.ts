import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
