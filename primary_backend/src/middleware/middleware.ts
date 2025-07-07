import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    try {
        const payload = jwt.verify(token || "", JWT_SECRET);
        // TODO: fix the types error
        // @ts-ignore
        req.id = payload.id;
        next();

    } catch (e) {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }
}