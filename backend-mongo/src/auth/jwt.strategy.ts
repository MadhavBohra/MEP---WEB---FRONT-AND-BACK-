import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserProfileDetailsService } from '../user/user-profile-details/user-profile-details.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userProfileService: UserProfileDetailsService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        const token = request?.cookies?.jwt
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Use environment variable in production
    });
  }

  async validate(payload: any) {
    const user = await this.userProfileService.findById(payload.sub);
    console.log(user);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email };
  }
}