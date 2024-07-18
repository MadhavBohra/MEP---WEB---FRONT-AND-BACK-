import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserDailyDetailsService } from './user-daily-update.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateUserDailyDto } from './dto/create-user-daily.dto';

// @UseGuards(JwtAuthGuard)
@Controller('api/v1/users')
export class UserDailyDetailsController {
    constructor(private readonly userDailyServices: UserDailyDetailsService){};

    @UseGuards(JwtAuthGuard)
    @Post(':id/daily')
    async addUser(
        @Param('id') userId : string,
        @Body() createUserDailyDto : CreateUserDailyDto,
        @CurrentUser() user
    ){
        if(userId !== user.userId){
            throw new UnauthorizedException("Accessing this not allowed")
        }

        const result = await this.userDailyServices.insertUser(
            userId,
            createUserDailyDto.steps,
            createUserDailyDto.calorie,
            createUserDailyDto.water
        );
        console.log(result);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/daily')
    async getUser(
        @Param('id') userId : string,
        @CurrentUser() user
        ){
        // console.log("hello");
        if(userId !== user.userId){
            throw new UnauthorizedException("Accessing this not allowed")
        }
        return await this.userDailyServices.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/daily/chart')
    async getChartData(
        @Param('id') userId: string,
        @CurrentUser() user
        ) {
            if(userId !== user.userId){
                throw new UnauthorizedException("Accessing this not allowed")
            }
            return await this.userDailyServices.getChartData(userId);
    }
}