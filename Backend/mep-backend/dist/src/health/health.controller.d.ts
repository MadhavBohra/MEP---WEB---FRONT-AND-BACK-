import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    healthFromModal(createHealthDto: CreateHealthDto): Promise<import("./health.entity").Health>;
    getChartData(email: string): Promise<any[]>;
}
