import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserHealthDetailsService } from './user-health-details.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard) 
@Controller('health')
export class UserHealthDetailsController {
    constructor(private readonly userHealthService: UserHealthDetailsService){}

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async addUser(
        @Param('id') userId : string,
        @Body('name') name : string,
        @Body('age') age : number,
        @Body('height') height : number,
        @Body('weight') weight : number,
        @Body('bloodGroup') bloodGroup : string,
        @Body('address') address : string,
    ){
        const result = await this.userHealthService.insertUser(
            userId,
            name,
            age,
            height,
            weight,
            bloodGroup,
            address
        );
        console.log(result);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') userId : string){
        // console.log("hello");
        return await this.userHealthService.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeUser(@Param('id') userId : string){
        await this.userHealthService.deleteUser(userId);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') userId : string,
        @Body('name') name : string,
        @Body('age') age : number,
        @Body('height') height : number,
        @Body('weight') weight : number,
        @Body('bloodGroup') bloodGroup : string,
        @Body('address') address : string,

    ){
        await this.userHealthService.updateUser(userId, name, age, height, weight, bloodGroup, address);
        return null;
    }
}