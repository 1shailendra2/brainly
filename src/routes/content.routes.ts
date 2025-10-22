import express, {Request, Response} from "express";
import {authMiddleware, AuthenticatedRequest} from "../middleware/m.middleware";
import { ContentModel } from "../models/Content";
const router= express.Router();
router.post("/content", authMiddleware , async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, type, link, tags } =req.body;
        const newContent= await ContentModel.create({
            title, link, type, tags, userId: req.userId
        });
        res.status(201).json({message: "Content added", content: newContent});
    } catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
 
router.get("/content", authMiddleware, async(req: AuthenticatedRequest, res: Response)=>{
try { const contents= await ContentModel.find({userId: req.userId});
res.status(200).json({contents});
}
catch (error) {
    console.error("error", error);
    res.status(500).json ({error: "Internal server error"});
}
});
router.patch("/content/:id", authMiddleware, async(req: AuthenticatedRequest, res: Response)=> {
    try {
        const updated= await ContentModel.findByIdAndUpdate( 
            req.params.id,
            req.body,
            {new: true}
        );
        if(!updated) return res.status(404).json({message:"content not found"});
        res.status(200).json({message:"content updated", content: updated})
    }
    catch (error) {
        console.error("error", error);
        res.status(500).json({error: "Internal server error"});
    }
});
router.delete("/content/:id", authMiddleware, async(req: AuthenticatedRequest, res: Response)=>{
    try{
        const deleted= await ContentModel.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "content not found"});
        res.status(200).json({message: "content deleted"});
    }
    catch(error){
        console.error("error", error);
        res.status(500).json({error: "internal server error"});
    }
});
export default router;