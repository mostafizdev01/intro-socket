import prisma from "../../utils/prisma"


const createMessage = async (payload: any) => {

    /// check existing conversation
    const existingConversation = await prisma.conversation.findFirst({
        where: {
            members: {
                hasEvery: [
                    payload.senderId, payload.receiverId
                ]
            }
        }
    })

    /// if already exists conversation
    if(existingConversation){
        return {
            success: true,
            message: "Conversation already exists",
            data: existingConversation
        }
    }


    /// create new conversation
    const message = await prisma.conversation.create({
        data: {
            members: [payload.senderId, payload.receiverId]
        }
    })

    return {
        succes: "true",
        status: 201,
        message: "Conversation Created",
        data: message
    };
}

export const MessageServices = {
    createMessage,
}