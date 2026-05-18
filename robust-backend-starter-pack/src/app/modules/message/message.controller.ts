import { Request, Response } from "express";
import { MessageServices } from "./message.services";


const createConversation = async (req: Request, res: Response)=> {
    const result = await MessageServices.createConversation(req.body);

    res.send(result)
}

// create message
const createMessage = async (req: Request, res: Response)=> {
    const result = await MessageServices.createMessage(req.body);

    res.send(result)
}

// Get Message By 
const getMessageByConId = async (req: Request, res: Response)=> {
    const result = await MessageServices.getMessageByConId(req.params);

    res.send(result)
}

export const MessageControllers = {
    createConversation,
    createMessage,
    getMessageByConId
}