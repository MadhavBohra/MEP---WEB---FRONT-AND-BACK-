import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserProfileDetailsService } from './user-profile-details.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserProfileDetailsController {
    constructor(private readonly userProfileService: UserProfileDetailsService){}

    @Post()
    @UseInterceptors(FileInterceptor('profilePicture'))
    async addUser(
        @Body('username') userName: string,
        @Body('email') userEmail: string,
        @Body('password') userPass: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const filePath = file ? await this.userProfileService.handleFileUpload(file) : null;
        const genId = await this.userProfileService.insertUser(
            userName,
            userEmail,
            userPass,
            filePath,
        );
        return {id : genId};    
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') userId : string){
        return this.userProfileService.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('profilePicture'))
    async updateUser(
        @Param('id') userId : string,
        @Body('username') userName : string,
        @Body('email') userEmail : string,
        @Body('password') userPass : string,
        @UploadedFile() file: Express.Multer.File,
    ){
        const filePath = file ? await this.userProfileService.handleFileUpload(file) : null;
        await this.userProfileService.updateUser(userId, userName, userEmail, userPass, filePath);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeUser(@Param('id') userId : string){
        await this.userProfileService.deleteUser(userId);
        return null;
    }
}
