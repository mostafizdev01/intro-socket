import { Router } from "express";
import { MessageControllers } from "./message.controller";


const router = Router();

router.post("/create-conversation", MessageControllers.createConversation);
router.post("/create-message", MessageControllers.createMessage);
router.get("/:conversationId", MessageControllers.getMessageByConId);

export const MessageRoutes = router;