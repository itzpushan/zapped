import { Router } from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { ZapCreateSchema } from "../types/index.js";
import { prismaClient } from "../db/index.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    // Assuming req.id is the user ID from the auth middleware
    const id = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if(!parsedData.success) {
        res.status(411).json({
            message: "incorrect inputs"
        })
    }

    if (!parsedData.success) {
        throw new Error("Invalid data provided");
    }

    const zapId = await prismaClient.$transaction(async tx => {
        const zap = await prismaClient.zap.create({
            data: {
                userId: id,
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata,
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id            }
        });

        await prismaClient.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        });

        return zap.id;
    })

    res.json({
        zapId
    });
    return;
});

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    res.json({
        zaps
    });
    return;
});


router.get("/:zapId", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    res.json({
        zap
    })

    return;
    
});

export const zapRouter = router;