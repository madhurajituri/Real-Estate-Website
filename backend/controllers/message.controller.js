import prisma from "../lib/prisma.js";

export const addmessage = async (req,res) => {
    const chatID = req.params.chatid;
    const tokenUserId = req.userID;
    const text = req.body.text;
    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatID,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            }
        })

        if(!chat){
            res.status(404).json("Chat does not exist/not authorized!");
        }

        const message = await prisma.message.create({
            data:{
                chatID,
                userID:tokenUserId,
                text
            }
        })

        await prisma.chat.update({
            where:{
                id:chatID,
            },
            data:{
                seenBy:[tokenUserId],
                lastMessage:text
            }
        })

        res.status(200).json(message);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to add message");
    }
}