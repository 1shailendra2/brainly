import express , {Request, Response} from "express";
import {authMiddleware , AuthenticatedRequest} from "../middleware/m.middleware";
import {Router} from "express";
import {LinkModel} from "../models/link";
import { ContentModel } from "../models/Content";
const router= express.Router();

router.post("/share", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { contentId, share } = req.body;
  const userId = req.userId;

  try {
    if (share) {
      let existing = await LinkModel.findOne({ userId, contentId });
      if (existing) {
        return res.status(200).json({ message: "Link already exists", link: existing });
      }
      const hash = Math.random().toString(36).substring(2, 10);
      const newLink = await LinkModel.create({ userId, contentId, hash });
      return res.status(201).json({ message: "Link shared", link: newLink });
    } else {
      await LinkModel.findOneAndDelete({ userId, contentId });
      return res.status(200).json({ message: "Link removed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:hash", async (req: Request, res: Response)=>{
  const {hash} = req.params;
  try {
    const link= await LinkModel.findOne({hash});
    if(!link){
      return res.status(404).json({message: "link not found"});
    }
    const content = await ContentModel.findById(link.contentId);
    if(!content){
      return res.status(404).json({message: "content not found"});
    }
    return res.status(200).json({content});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})
export default router;