import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Health } from './health.entity';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Health, User])],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
