// src/user/user-health-details/dto/create-user-health.dto.ts
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateUserHealthDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  age: number;

  @IsNumber()
  @Min(0)
  height: number;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsString()
  bloodGroup: string;

  @IsString()
  address: string;
}