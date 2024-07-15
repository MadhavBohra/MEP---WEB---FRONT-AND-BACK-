import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserHealthSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
});

export interface UserHealth extends mongoose.Document {
    userId: string,
    name: string,
    age: number,
    height: number,
    weight: number,
    bloodGroup: string,
    address: string
}