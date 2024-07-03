import { IsEmail, IsString, MinLength, Matches, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  })
  password: string;
  
  profilePicture?: Express.Multer.File;
}