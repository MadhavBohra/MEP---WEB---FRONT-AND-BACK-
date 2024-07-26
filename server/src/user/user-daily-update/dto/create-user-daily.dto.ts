// src/user/user-daily-update/dto/create-user-daily.dto.ts
import { IsNumber, Min } from 'class-validator';

export class CreateUserDailyDto {
  @IsNumber()
  @Min(0)
  steps: number;

  @IsNumber()
  @Min(0)
  calorie: number;

  @IsNumber()
  @Min(0)
  water: number;
}