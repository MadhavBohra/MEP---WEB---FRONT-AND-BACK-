import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserDailySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    steps: { type: Number, required: true },
    calorie: { type: Number, required: true },
    water: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true }
});

export interface UserDaily extends mongoose.Document {
    userId: string,
    steps: number,
    calorie: number,
    water: number,
    date: Date
}