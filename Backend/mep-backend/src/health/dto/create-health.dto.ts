import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHealthDto {
  @IsEmail()
  email: string;

  @IsNumber()
  steps: number;

  @IsNumber()
  calories: number;

  @IsNumber()
  water_intake: number;
}
