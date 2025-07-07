import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { SigninSchema, SignupSchema } from "../types/index.js";
import { prismaClient } from "../db/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });

    if(userExists) {
        res.status(403).json({
            message: "User already exists"
        });
        return;
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.email,
            // TODO: Hash the password before storing it
            password: parsedData.data.password,
            name: parsedData.data.name || ""
        }
    });
 
    res.json({
        message: "Please verify your account"
    }); 

    return;
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password // TODO: Hash the password before checking it
        }
    });

    if(!user) {
        res.status(403).json({
            message: "Invalid credentials"
        });
        return;
    }

    // sign the jwt token
    const token = jwt.sign({
        id: user.id,
    }, JWT_SECRET)
    
    res.json({
        token: token
    });
    return;
});

router.get("/", authMiddleware, async (req, res) => {
    // TODO: fix the types
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true,
        }
    })

    res.json({
        user
    })

    return;
});

export const userRouter = router;