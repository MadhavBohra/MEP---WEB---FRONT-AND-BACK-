import { Repository } from 'typeorm';
import { Health } from './health.entity';
import { User } from '../user/user.entity';
import { CreateHealthDto } from './dto/create-health.dto';
export declare class HealthService {
    private healthRepository;
    private userRepository;
    constructor(healthRepository: Repository<Health>, userRepository: Repository<User>);
    healthFromModal(createHealthDto: CreateHealthDto): Promise<Health>;
    getChartData(email: string): Promise<any[]>;
}
