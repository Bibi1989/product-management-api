import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const Auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("auth");
  if (!token) return res.json({ status: "error", error: "Your not authorize" });

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
};
