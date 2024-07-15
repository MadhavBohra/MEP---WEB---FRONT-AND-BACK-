import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserHealth } from './user-health-details.model';

@Injectable()
export class UserHealthDetailsService {
    constructor(
        @InjectModel('UserHealth') private readonly UserHealthModel: Model<UserHealth>,
    ){};

    async insertUser(
        userId: string, 
        name: string,
        age: number,
        height: number, 
        weight: number, 
        bloodGroup: string, 
        address: string
    ){
        const newUser = new this.UserHealthModel({
            userId,
            name,
            age,
            height,
            weight,
            bloodGroup,
            address
        });
        const result = await newUser.save();
        console.log(result);
        return result.id as string;
    }

    async getSingleUser(userId : string) {
        const user = await this.findUser(userId);
        return {
            userId : user.userId,
            name : user.name,
            age : user.age,
            height : user.height,
            weight : user.weight,
            bloodGroup : user.bloodGroup,
            address : user.address
        };
    }

    async deleteUser(userId : string){
        const result = await this.UserHealthModel.deleteOne({ userId }).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find user');
        }
    }

    async updateUser(
        userId: string, 
        name: string,
        age: number,
        height: number, 
        weight: number, 
        bloodGroup: string, 
        address: string
    ) {
        const updatedUser = await this.findUser(userId);
        if(name){
            updatedUser.name = name;
        }
        if(age){
            updatedUser.age = age;
        }
        if(height){
            updatedUser.height = height;
        }
        if(weight){
            updatedUser.weight = weight;
        }
        if(bloodGroup){
            updatedUser.bloodGroup = bloodGroup;
        }if(address){
            updatedUser.address = address;
        }
        updatedUser.save();
    }

    private async findUser(userId : string): Promise<UserHealth>{
        let user;
        try{
            user = await this.UserHealthModel.findOne({userId}).exec();
        } catch(error) {
            throw new NotFoundException("Could not find user");
        }
        if(!user){
            throw new NotFoundException("Could not find user.")
        }
        return user;
    }
}