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
      
      if (!userExists) {
        throw new NotFoundException('User not found');
      }
      
      const currentYear = new Date().getFullYear();
      
      const result = await this.UserDailyModel.aggregate([
        { 
          $match: { 
            userId: idToSearch,
            date: {
              $gte: new Date(`${currentYear}-01-01`),
              $lt: new Date(`${currentYear + 1}-01-01`)
            }
          } 
        },
        {
          $group: {
            _id: { month: { $month: '$date' } },
            average_steps: { $avg: '$steps' },
            average_calorie: { $avg: '$calorie' },
            average_water: { $avg: '$water' },
          }
        },
        {
          $project: {
            month: {
              $let: {
                vars: {
                  monthsInString: [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] }
              }
            },
            water: { $round: ['$average_water', 2] },
            steps: { $round: ['$average_steps', 2] },
            Calories: { $round: ['$average_calorie', 2] },
            _id: 0
          }
        },
        { $sort: { '_id.month': 1 } }
      ]).exec();
    
      // Create a map of existing data
      const dataMap = new Map(result.map(item => [item.month, item]));
    
      // Create the final dataset with default values for missing months
      const finalDataset = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ].map(month => ({
        month,
        water: dataMap.get(month)?.water ?? 0,
        steps: dataMap.get(month)?.steps ?? 0,
        Calories: dataMap.get(month)?.Calories ?? 0
      }));
    
      return finalDataset;
    }
    
}