import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserHealthDetailsService } from './user-health-details.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserHealthDto } from './dto/create-user-health.dto';
import { UpdateUserHealthDto } from './dto/update-user-health.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

// @UseGuards(JwtAuthGuard) 
@Controller('api/v1/users')
export class UserHealthDetailsController {
    constructor(private readonly userHealthService: UserHealthDetailsService){}

    @UseGuards(JwtAuthGuard)
    @Post(':id/health')
    async addUser(
        @Param('id') userId : string,
        @Body() createUserHealthDto: CreateUserHealthDto,
        @CurrentUser() user
    ){
        if(userId !== user.userId){
            throw new UnauthorizedException("Accessing this not allowed")
        }

        const result = await this.userHealthService.insertUser(
            userId,
            createUserHealthDto.name,
            createUserHealthDto.age,
            createUserHealthDto.height,
            createUserHealthDto.weight,
            createUserHealthDto.bloodGroup,
            createUserHealthDto.address
        );
        console.log(result);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/health')
    async getUser(
        @Param('id') userId : string,
        @CurrentUser() user
        ){
        // console.log("hello");
        if(userId !== user.userId){
            throw new UnauthorizedException("Accessing this not allowed")
        }
        return await this.userHealthService.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/health')
    async removeUser(
        @Param('id') userId : string,
        @CurrentUser() user
        ){
            if(userId !== user.userId){
                throw new UnauthorizedException("Accessing this not allowed")
            }
            await this.userHealthService.deleteUser(userId);
            return null;
        }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/health')
    async updateUser(
        @Param('id') userId : string,
        @Body() updateUserHealthDto: UpdateUserHealthDto,
        @CurrentUser() user
    ){
        if(userId !== user.userId){
            throw new UnauthorizedException("Accessing this not allowed")
        }

        await this.userHealthService.updateUser(
            userId,
            updateUserHealthDto.name,
            updateUserHealthDto.age,
            updateUserHealthDto.height,
            updateUserHealthDto.weight,
            updateUserHealthDto.bloodGroup,
            updateUserHealthDto.address
        );
        return null;
    }
}