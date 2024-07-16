import { Controller, Post, UseGuards, Request, Body, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserProfileDetailsService } from '../user/user-profile-details/user-profile-details.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserProfileDto } from 'src/user/user-profile-details/dto/create-user-profile.dto';
import { Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileDetailsService
  ) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async signup(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = file ? await this.userProfileService.handleFileUpload(file) : null;
    const genId = await this.userProfileService.insertUser(
      createUserProfileDto.username,
      createUserProfileDto.email,
      createUserProfileDto.password,
      filePath,
    );
    return { id: genId };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({passthrough: true}) res: Response) {
    return this.authService.login(req.user, res);
  }
}