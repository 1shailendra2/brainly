import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
username: string;
email: string;
password: string;
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const UserModel = mongoose.model<IUser>("User", UserSchema);