import express , {Request, Response} from "express";
import {authMiddleware , AuthenticatedRequest} from "../middleware/m.middleware";
import {Router} from "express";
import {LinkModel} from "../models/link";
const router= express.Router();

router.post("/link/share", authMiddleware, async(req:AuthenticatedRequest, res: Response)=>{
        const {share }= req.body;
        const userId= req.userId;
    try{
        if(share){
            const hash= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const newLink= await LinkModel.create({userId, hash});
            return res.status(201).json({message: "link shared", link: newLink})
        }
        else {
            await LinkModel.findOneAndDelete({userId});
            return res.status(200).json({message:" link not shared"});
        }
    }
    catch(error){
        console.error("error", error);
        return res.status(500).json({error: "Internal server error"});
    }
});