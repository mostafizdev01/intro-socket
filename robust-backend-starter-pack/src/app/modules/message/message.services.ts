import prisma from "../../utils/prisma"


const createConversation = async (payload: any) => {

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
    if (existingConversation) {
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


/// create message
const createMessage = async (payload: any) => {

    const { conversationId, senderId, text } = payload;

    const message = await prisma.message.create({
        data: {
            conversationId,
            senderId,
            text
        }
    })

    return {
        succes: "true",
        status: 201,
        message: "Message Created",
        data: message
    };
}

/// get message with ConversationId
const getMessageByConId = async (payload: any) => {

    const { conversationId } = payload;

    const message = await prisma.message.findMany({
        where: {
            conversationId
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    return {
        succes: "true",
        status: 201,
        message: "Message get with ConversationId",
        data: message
    };
}


export const MessageServices = {
    createConversation,
    createMessage,
    getMessageByConId
}