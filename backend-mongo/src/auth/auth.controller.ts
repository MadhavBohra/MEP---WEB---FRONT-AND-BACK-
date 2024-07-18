import { Controller, Post, UseGuards, Request, Body, UseInterceptors, UploadedFile, Res, Get } from '@nestjs/common';
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
  @Res() res: Response
) {
  try {
    const filePath = file ? await this.userProfileService.handleFileUpload(file) : null;
    const genId = await this.userProfileService.insertUser(
      createUserProfileDto.email,
      createUserProfileDto.username,
      createUserProfileDto.password,
      filePath,
    );
    return res.status(200).json({ id: genId, message: 'User successfully created' });
  } catch (error) {
    // Handle errors appropriately
    return res.status(400).json({ message: 'Signup failed', error: error.message });
  }
}

@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    try{
      const loginResult = await this.authService.login(req.user, res);
      // console.log(loginResult);
      return res.status(200).json(loginResult);
    } catch(error){
      return res.status(401).json({message : 'Login failed', error : error.message})
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@Request() req, @Res() res) {
    // The user object is attached to the request by the JWT strategy    

    const userData = {
      userId: req.user.userId,
      username: req.user.email,
      // Include any other necessary user data
    };

    return res.status(200).json(userData)
  }
}