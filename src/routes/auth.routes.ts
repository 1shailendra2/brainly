import express, {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import dotenv from "dotenv";
import { id } from "zod/locales";
dotenv.config();
const router = express.Router();
router.post("/signup", async (req: Request, res: Response) => {
    try{
        const { username, email, password} =req.body;
        const existingUser=await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user= await UserModel.create({
            username, email, password: hashedPassword,
        });
res.status(201).json({message:"user created sucessfully", user: {id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        console.error("signup error", error);
        res.status(500).json({message: "Internal server error"});
    }
});
router.post("/signin", async (req: Request, res: Response)=>{
    try{
        const {email, password}= req.body;
        const user= await UserModel.findOne({email});
            
        if(!user){
            return res.status(400).json({message: "invalid credentials"});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({message: "invalid credentials"});
        }
        const token= jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"});
        res.status(200).json({message: "signin successful", token, user:{id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        console.error("signin error", error);
        res.status(500).json({message: "Internal server error"});
    }
});
export default router;