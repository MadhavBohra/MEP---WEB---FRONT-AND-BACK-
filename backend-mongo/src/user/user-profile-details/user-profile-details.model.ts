import * as mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {type: String},
});

export interface UserProfile extends mongoose.Document {
    id: string,
    username: string,
    email: string,
    password: string,
    profilePicture: string,
}