import * as mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {type: String},
});

export interface UserProfile extends mongoose.Document {
    id: string,
    email: string,
    username: string,
    password: string,
    profilePicture: string,
}