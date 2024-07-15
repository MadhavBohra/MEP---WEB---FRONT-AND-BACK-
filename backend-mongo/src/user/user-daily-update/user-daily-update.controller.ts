import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserDailyDetailsService } from './user-daily-update.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('daily')
export class UserDailyDetailsController {
    constructor(private readonly userDailyServices: UserDailyDetailsService){};

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async addUser(
        @Param('id') userId : string,
        @Body('steps') steps : number,
        @Body('calorie') calorie : number,
        @Body('water') water : number,
    ){
        const result = await this.userDailyServices.insertUser(
            userId,
            steps,
            calorie,
            water,
        );
        console.log(result);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') userId : string){
        // console.log("hello");
        return await this.userDailyServices.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('chart/:id')
    async getChartData(@Param('id') userId: string) {
        return await this.userDailyServices.getChartData(userId);
    }
}