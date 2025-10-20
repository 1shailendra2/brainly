import mongoose, {Schema, Document} from "mongoose";
export interface ILink extends Document { 
 userId: mongoose.Types.ObjectId;
 hash: string;
}
const LinkSchema= new Schema<ILink>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    hash: {type: String, required: true, unique: true},
},
{timestamps: true}
);
export const LinkModel= mongoose.model<ILink>("link", LinkSchema);