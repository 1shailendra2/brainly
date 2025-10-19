import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface JwtUserPayload extends JwtPayload {
  id: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token as string, secret) as JwtUserPayload;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
