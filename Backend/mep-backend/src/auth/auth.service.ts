import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string, password: string }) {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (!validatedUser) {
      throw new UnauthorizedException();
    }
    const payload = { username: validatedUser.email, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
