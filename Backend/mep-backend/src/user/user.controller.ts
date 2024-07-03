import { Controller, Get, Param, Post, Body, Put, Delete, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ProfilePictureInterceptor } from './interceptors/file-upload.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ProfilePictureInterceptor)
  
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }
    return this.userService.create(createUserDto, file ? file.filename : undefined);
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
