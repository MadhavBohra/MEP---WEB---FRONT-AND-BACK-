import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { UserDaily } from './user-daily-update.model';

@Injectable()
export class UserDailyDetailsService {
    constructor(
        @InjectModel('UserDaily') private readonly UserDailyModel: Model<UserDaily>
    ){};

    async insertUser(
        userId: string, 
        steps: number,
        calorie: number,
        water: number, 
    ){
        const newUser = new this.UserDailyModel({
            userId,
            steps,
            calorie,
            water,
            date: new Date()
        });
        const result = await newUser.save();
        console.log(result);
        return result.id as string;
    }

    async getSingleUser(userId : string) {
        const user = await this.UserDailyModel.findOne({userId}).sort({date : -1}).exec();
        console.log(user);
        
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return {
            userId : user.userId,
            steps: user.steps,
            calorie: user.calorie,
            water: user.water,
            date: user.date
        };
    }

    async getChartData(userId: string) {
        let idToSearch = new mongoose.Types.ObjectId(userId);
        const userExists = await this.UserDailyModel.findOne({ userId }).exec();
        console.log(userExists);
        
        if (!userExists) {
          throw new NotFoundException('User not found');
        }    
        return await this.UserDailyModel.aggregate([
          { $match: { userId : idToSearch } },
          {
            $group: {
              _id: {
                month: { $month: '$date' },
                year: { $year: '$date' }
              },
              average_steps: { $avg: '$steps' },
              average_calorie: { $avg: '$calorie' },
              average_water: { $avg: '$water' },
            }
          },
          {
            $project: {
              month: '$_id.month',
              year: '$_id.year',
              average_steps: 1,
              average_calorie: 1,
              average_water: 1,
              _id: 0
            }
          },
          { $sort: { year: 1, month: 1 } }
        ]).exec();
      }
    
}