import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserProfileDetailsService } from '../user/user-profile-details/user-profile-details.service';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userProfileService: UserProfileDetailsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userProfileService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // this method logs in the user and creates a jwt token using the payload 
  async login(user: any, res: Response) {
    const payload = { email: user.username, sub: user._id };    
    const token = this.jwtService.sign(payload);
    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    return { message: 'Login successful' };
  }
}