// src/user/user-profile-details/dto/create-user-profile.dto.ts
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}