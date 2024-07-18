import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProfile } from './user-profile-details.model';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer';
import * as multer from 'multer';
import * as bcrypt from 'bcryptjs';
import { type } from 'os';


@Injectable()
export class UserProfileDetailsService {
    private upload: multer.Multer;

    constructor(
        @InjectModel('UserProfile') private readonly UserProfileModel: Model<UserProfile>,
    ) {
        this.upload = multer({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                }
            })
        });
    }

    async handleFileUpload(file: Express.Multer.File): Promise<string> {
        return file ? file.path : './uploads/default-profile.jpg';
    }

    async insertUser(email: string, username: string, password: string, profilePic?: string){
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new this.UserProfileModel({
            email,
            username,
            password: hashedPass,
            profilePicture : profilePic || './uploads/default-profile.jpg'
        });
        const result = await newUser.save();        
        return result.id as string;
    }

    async getSingleUser(userId : string) {
        const user = await this.findUser(userId);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            profilePicture: user.profilePicture,
        };
    }

    async updateUser(
        userId : string,
        userName : string,
        userEmail : string,
        userPass : string,
        profilePic? : string
    ) {
        const updatedUser = await this.findUser(userId);
        if(userName){
            updatedUser.username = userName;
        }
        if(userEmail){
            updatedUser.email = userEmail;
        }
        if(userPass){
            const salt = await bcrypt.genSalt();
            updatedUser.password = await bcrypt.hash(userPass, salt);
        }
        if(profilePic){
            updatedUser.profilePicture = profilePic;
        }
        updatedUser.save();
    }

    async deleteUser(userId : string){
        const result = await this.UserProfileModel.deleteOne({_id : userId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find user');
        }
    }

    private async findUser(id : string): Promise<UserProfile>{
        let user;
        try{
            user = await this.UserProfileModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException("Could not find user");
        }
        if(!user){
            throw new NotFoundException("Could not find user.")
        }
        return user;
    }

    async findByUsername(username: string): Promise<UserProfile | undefined> {
        return this.UserProfileModel.findOne({ username }).exec();
      }

    async findById(id: string): Promise<UserProfile | undefined> {
        const objectId = new Types.ObjectId(id)
        
        return this.UserProfileModel.findById(objectId).exec();
    }
}
