import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('healthfrommodal')
  async healthFromModal(@Body() createHealthDto: CreateHealthDto) {
    return this.healthService.healthFromModal(createHealthDto);
  }

  @Get('chartdata/:email')
  async getChartData(@Param('email') email: string) {
    return this.healthService.getChartData(email);
  }
}
