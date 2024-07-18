import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserProfileDetailsService } from './user-profile-details.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('api/v1/users')
export class UserProfileDetailsController {
    constructor(private readonly userProfileService: UserProfileDetailsService){}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(
        @Param('id') userId : string,
        @CurrentUser() user
        ){
            console.log("userId");
            if(userId !== user.userId){
                throw new UnauthorizedException("Accessing this not allowed")
            }
            return this.userProfileService.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('profilePicture'))
    async updateUser(
        @Param('id') userId : string,
        @Body() updateUserProfileDto: UpdateUserProfileDto,
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user
    ){
        if(userId !== user.userId){
            throw new UnauthorizedException("Accessing this not allowed")
        }

        const filePath = file ? await this.userProfileService.handleFileUpload(file) : null;
        await this.userProfileService.updateUser(
            userId,
            updateUserProfileDto.username,
            updateUserProfileDto.email,
            updateUserProfileDto.password,
            filePath
        );
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeUser(
        @Param('id') userId : string,
        @CurrentUser() user
        ){
            if(userId !== user.userId){
                throw new UnauthorizedException("Accessing this not allowed")
            }
            await this.userProfileService.deleteUser(userId);
            return null;
    }
}
