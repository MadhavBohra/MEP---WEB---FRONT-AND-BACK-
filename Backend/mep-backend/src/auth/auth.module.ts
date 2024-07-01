import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT_SECRET:', secret); // Debug log
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '60m' }, // Adjust as needed
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    PassportModule,
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
