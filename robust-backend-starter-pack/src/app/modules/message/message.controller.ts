import { Request, Response } from "express";
import { MessageServices } from "./message.services";


const createMessage = async (req: Request, res: Response)=> {
    const result = await MessageServices.createMessage(req.body);

    res.send(result)
}

export const MessageControllers = {
    createMessage
}