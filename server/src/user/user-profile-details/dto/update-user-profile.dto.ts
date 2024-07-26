// src/user/user-profile-details/dto/update-user-profile.dto.ts
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}