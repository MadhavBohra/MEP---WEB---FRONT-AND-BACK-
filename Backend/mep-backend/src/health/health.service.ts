import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from './health.entity';
import { User } from '../user/user.entity';
import { CreateHealthDto } from './dto/create-health.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async healthFromModal(createHealthDto: CreateHealthDto): Promise<Health> {
    const { email, steps, calories, water_intake } = createHealthDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let healthEntry = await this.healthRepository.findOne({
      where: { user, date: today },
    });

    if (healthEntry) {
      healthEntry.steps = steps;
      healthEntry.calories = calories;
      healthEntry.water_intake = water_intake;
    } else {
      healthEntry = this.healthRepository.create({
        user,
        steps,
        calories,
        water_intake,
        date: today,
      });
    }

    return this.healthRepository.save(healthEntry);
  }

  async getChartData(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    return this.healthRepository
      .createQueryBuilder('health')
      .select('EXTRACT(MONTH FROM health.date)', 'month')
      .addSelect('AVG(health.steps)', 'average_steps')
      .addSelect('AVG(health.calories)', 'average_calories')
      .addSelect('AVG(health.water_intake)', 'average_water_intake')
      .where('health.userId = :userId', { userId: user.id })
      .groupBy('month')
      .getRawMany();
  }
}
