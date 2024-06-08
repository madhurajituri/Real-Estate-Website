import prisma from "../lib/prisma.js";

export const getchats = async (req,res) => {
    const tokenUserId = req.userID;
    try{
        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome: [tokenUserId],
                }
            }
        })

        for (const chat of chats){
            const receiverID = chat.userIDs.find(id => id !== tokenUserId);
            const receiver = await prisma.user.findUnique({
                where:{
                    id:receiverID
                },
                select:{
                    id:true,
                    username:true,
                    profile:true,
                }
            })

            chat.receiver = receiver;
        }
        console.log(chats);
        res.status(200).json(chats);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to get chats");
    }
}


export const getchat = async (req,res) => {
    const tokenUserId = req.userID;

    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId],
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where:{
                id: req.params.id
            },
            data:{
                seenBy:{
                    set:[tokenUserId],
                }
            }
        })

        res.status(200).json(chat);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to get chat");
    }
}


export const createchat = async (req,res) => {
    const tokenUserId = req.userID;
    try{
        const newChat = await prisma.chat.create({
            data:{
                userIDs:[tokenUserId , req.body.receiverID]
            }
        })
        res.status(200).json(newChat);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to create chat");
    }
}


export const readchat = async (req,res) => {
    const tokenUserId = req.userID
    try{
        const chat = await prisma.chat.update({
            where:{
                id: req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    set:[tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to read chat");
    }
}