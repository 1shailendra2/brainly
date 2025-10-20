import mongoose , { Schema, Document, Model } from 'mongoose';
export interface IContent extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    type?: string;
    link?: string;
    tags?: string[];
}
const ContentSchema = new Schema<IContent>({ 
userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
title: {type: String, required: true},
type: {type: String, enum: ['text', 'image', 'video'], default: 'text'},
link: {type: String},
tags: [{type: String}],
},
{timestamps: true});
export const ContentModel= mongoose.model<IContent>("content", ContentSchema);