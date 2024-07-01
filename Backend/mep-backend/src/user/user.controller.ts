import { Controller, Get, Param, Post, Body, Put, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }
    return this.userService.create(user);
  }
  

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> { 
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
