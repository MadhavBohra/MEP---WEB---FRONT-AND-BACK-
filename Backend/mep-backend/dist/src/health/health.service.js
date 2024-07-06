"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const health_entity_1 = require("./health.entity");
const user_entity_1 = require("../user/user.entity");
let HealthService = class HealthService {
    constructor(healthRepository, userRepository) {
        this.healthRepository = healthRepository;
        this.userRepository = userRepository;
    }
    async healthFromModal(createHealthDto) {
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
        }
        else {
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
    async getChartData(email) {
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
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(health_entity_1.Health)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HealthService);
//# sourceMappingURL=health.service.js.map